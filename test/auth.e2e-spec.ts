import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { initApp } from './util'

describe('AuthController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    app = await initApp()
  })

  it('/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/signup')
      .expect(201)
      .expect('signup')
  })

  it('/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/login')
      .expect(201)
      .expect('login')
  })
})
