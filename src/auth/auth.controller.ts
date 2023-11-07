import { Body, Controller, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { AuthDto } from './auth.dto'
import { AuthEntity } from './auth.entity'
import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: AuthEntity })
  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return new AuthEntity(await this.authService.signup(dto))
  }

  @ApiCreatedResponse({ type: AuthEntity })
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return new AuthEntity(await this.authService.login(dto))
  }
}
