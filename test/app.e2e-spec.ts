import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { fixture as f } from './helper'
import auth from './suites/auth'

import { AppModule } from '@/app.module'

describe('AppController (e2e)', () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    f.app = moduleFixture.createNestApplication()
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
