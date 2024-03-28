import { INestApplication } from '@nestjs/common'

import { BookmarkEntity } from '@/bookmark/bookmark.entity'
import { UserEntity } from '@/user/user.entity'

interface Fixture {
  app: INestApplication
  user: Partial<UserEntity>
  bookmark: Partial<BookmarkEntity>
}
export const fixture = {
  app: undefined,
  user: {
    email: 'foo@bar.com',
    password: '123',
  },
  bookmark: {
    title: 'bookmark',
    description: '',
    link: '',
  },
} as unknown as Fixture
