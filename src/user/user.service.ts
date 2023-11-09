import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/prisma/prisma.service'

import { EditUserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async editUser(userId: string, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: dto,
    })

    return user
  }
}
