import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import * as argon from 'argon2'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'

import { PrismaClient } from '@/generated/prisma'
import { PrismaService } from '@/prisma/prisma.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('AuthController', () => {
  let authController: AuthController
  let prismaMock: DeepMockProxy<PrismaClient>

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, JwtService, ConfigService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .overrideProvider(ConfigService)
      .useValue({
        get: (key) => {
          if (key === 'JWT_SECRET') return 'jwt_secret'
        },
      })
      .compile()

    authController = app.get(AuthController)
    prismaMock = app.get(PrismaService)
  })

  it('should user signup', async () => {
    const user = {
      email: 'foo@bar.com',
      password: 'foobar',
    }
    prismaMock.user.create.mockResolvedValue({
      ...user,
      id: 'id',
      createdAt: new Date(),
      updatedAt: new Date(),
      hash: '',
      firstName: null,
      lastName: null,
    })

    await expect(authController.signup(user)).resolves.toHaveProperty(
      'email',
      user.email,
    )
  })

  it('should user login', async () => {
    const user = {
      email: 'foo@bar.com',
      password: 'foobar',
    }
    prismaMock.user.findUnique.mockResolvedValue({
      ...user,
      id: 'id',
      createdAt: new Date(),
      updatedAt: new Date(),
      hash: await argon.hash(user.password),
      firstName: '',
      lastName: '',
    })

    await expect(authController.login(user)).resolves.toHaveProperty(
      'email',
      user.email,
    )
  })
})
