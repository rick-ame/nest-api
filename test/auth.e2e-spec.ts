import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { initApp } from './util'

describe('AuthController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await initApp()
  })
  afterAll(async () => {
    await app.close()
  })

  const user = {
    email: 'foo@bar.com',
    password: '123',
  }

  it('/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/signup')
      .send(user)
      .expect(201)
      .expect(({ body }) => {
        expect(body.email).toBe(user.email)
      })
  })

  it('/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send(user)
      .expect(201)
      .expect(({ body }) => {
        expect(body.email).toBe(user.email)
      })
  })
})
