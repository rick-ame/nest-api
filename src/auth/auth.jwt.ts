import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard, PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { PrismaService } from '@/prisma/prisma.service'

import { UserEntity } from './auth.entity'

export interface JwtPayload {
  sub: string
  email: string
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET')!,
    })
  }

  async validate({ sub }: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: sub,
      },
    })
    return user && new UserEntity(user)
  }
}

export class JwtGuard extends AuthGuard('jwt') {}
