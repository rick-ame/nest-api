import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { AppModule } from '@/app.module'
import { globalUse } from '@/hydrate'

import { fixture as f } from './helper'
import auth from './suites/auth'

describe('AppController (e2e)', () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    f.app = moduleFixture.createNestApplication()
    globalUse(f.app)

    await f.app.init()
  })
  afterAll(async () => {
    await f.app.close()
  })

  it('/ (GET)', () => {
    return request(f.app.getHttpServer()).get('/').expect(200)
  })

  auth()
})
