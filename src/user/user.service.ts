import { Injectable, Logger, NotFoundException } from '@nestjs/common'

import { PrismaService } from '@/prisma/prisma.service'

import { EditUserDto } from './user.dto'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(private readonly prisma: PrismaService) {}

  async editUser(userId: string, dto: EditUserDto) {
    const found = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!found) {
      throw new NotFoundException('User not found')
    }

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: dto,
    })

    this.logger.log(`User info update: ${user.id} - ${JSON.stringify(dto)}`)

    return user
  }
}
