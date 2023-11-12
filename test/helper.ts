import { INestApplication } from '@nestjs/common'

import { UserEntity } from '@/user/user.entity'

interface Fixture {
  app: INestApplication
  user: Partial<UserEntity>
}
export const fixture = {
  app: undefined,
  user: {
    email: 'foo@bar.com',
    password: '123',
  },
} as unknown as Fixture
