import { Test } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'

import { PrismaService } from '@/prisma/prisma.service'

import { UserController } from './user.controller'
import { UserService } from './user.service'

describe('UserController', () => {
  let userController: UserController
  let prismaMock: DeepMockProxy<PrismaClient>

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile()
    userController = app.get(UserController)
    prismaMock = app.get(PrismaService)
  })

  it('should get me', () => {
    expect(
      userController.getMe({
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'foo@bar.com',
        firstName: null,
        lastName: null,
        hash: '',
      }),
    ).toHaveProperty('email', 'foo@bar.com')
  })

  it('should edit user', () => {
    prismaMock.user.update.mockResolvedValue({
      id: 'id',
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'foo@bar.com',
      firstName: null,
      lastName: null,
      hash: '',
    })

    expect(
      userController.editUser('id', {
        email: 'foo@bar.com',
      }),
    ).resolves.toHaveProperty('email', 'foo@bar.com')
  })
})
