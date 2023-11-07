import { Injectable } from '@nestjs/common'

import { AuthDto } from './auth.dto'

@Injectable()
export class AuthService {
  signup(dto: AuthDto) {
    return 'signup'
  }

  login() {
    return 'login'
  }
}
