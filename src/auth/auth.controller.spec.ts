import { Test } from '@nestjs/testing'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('AuthController', () => {
  let authController: AuthController

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile()

    authController = app.get(AuthController)
  })

  describe('auth', () => {
    it('should user signup', () => {
      expect(
        authController.signup({ email: 'foo@bar.com', password: 'foobar' }),
      ).toEqual('signup')
    })

    it('should user login', () => {
      expect(authController.login()).toEqual('login')
    })
  })
})
