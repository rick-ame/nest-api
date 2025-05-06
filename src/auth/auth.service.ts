import { ForbiddenException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import * as argon from 'argon2'

import { PrismaService } from '@/prisma/prisma.service'

import { AuthDto } from './auth.dto'
import { AuthEntity } from './auth.entity'
import { type JwtPayload } from './auth.jwt'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signup(dto: AuthDto): Promise<AuthEntity> {
    const hash = await argon.hash(dto.password)
    try {
      const found = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      })
      if (found) {
        throw new ForbiddenException('Credentials taken')
      }

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      })

      this.logger.log(`User signup: ${user.id} - ${user.email}`)

      return {
        ...user,
        accessToken: await this.signToken(user.id, user.email),
      }
    } catch (error) {
      // require db `unique` support
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken')
        }
      }
      throw error
    }
  }

  async login(dto: AuthDto): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })
    if (!user) throw new ForbiddenException('Credentials incorrect')

    const pwdMatch = await argon.verify(user.hash, dto.password)
    if (!pwdMatch) throw new ForbiddenException('Credentials incorrect')

    this.logger.log(`User login: ${user.id} - ${user.email}`)

    return {
      ...user,
      accessToken: await this.signToken(user.id, user.email),
    }
  }

  private async signToken(userId: string, email: string) {
    const payload: JwtPayload = {
      sub: userId,
      email,
    }
    return this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: this.config.get('JWT_SECRET'),
    })
  }
}
