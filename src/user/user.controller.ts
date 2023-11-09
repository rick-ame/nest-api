import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { JwtGuard } from '@/auth/auth.jwt'
import { GetUser } from '@/auth/decorator'

import { EditUserDto } from './user.dto'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'

@ApiBearerAuth()
@ApiTags('user')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ type: UserEntity })
  @Get('me')
  getMe(@GetUser() user: UserEntity) {
    return user
  }

  @ApiCreatedResponse({ type: UserEntity })
  @Patch()
  async editUser(@GetUser('id') userId: string, @Body() dto: EditUserDto) {
    return new UserEntity(await this.userService.editUser(userId, dto))
  }
}
