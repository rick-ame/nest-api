import * as request from 'supertest'

import { fixture as f } from '../helper'

export default () =>
  describe('AuthController (e2e)', () => {
    const user = {
      email: 'foo@bar.com',
      password: '123',
    }

    it('/signup (POST)', () => {
      return request(f.app.getHttpServer())
        .post('/signup')
        .send(user)
        .expect(201)
        .expect(({ body }) => {
          expect(body.email).toBe(user.email)
        })
    })

    it('/login (POST)', () => {
      return request(f.app.getHttpServer())
        .post('/login')
        .send(user)
        .expect(200)
        .expect(({ body }) => {
          expect(body.email).toBe(user.email)
        })
    })
  })
