import { INestApplication } from '@nestjs/common'
import { App } from 'supertest/types'

import { BookmarkEntity } from '@/bookmark/bookmark.entity'
import { UserEntity } from '@/user/user.entity'

interface Fixture {
  app: INestApplication<App>
  user: Partial<UserEntity>
  authHeader: { Authorization: string }
  bookmark: Partial<BookmarkEntity>
}
export const fixture = {
  app: undefined,
  user: {
    email: `Test-${Date.now()}@foobar.com`,
    password: '123456',
  },
  bookmark: {
    title: 'Bookmark',
    description: 'bookmark',
    link: 'https://bookmark.com',
  },
  authHeader: {},
} as unknown as Fixture
