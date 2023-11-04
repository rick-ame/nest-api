import { Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup() {
    return this.authService.signup()
  }

  @Post('login')
  login() {
    return this.authService.login()
  }
}
