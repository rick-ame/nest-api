import * as request from 'supertest'

import { fixture as f } from '../helper'

export default () =>
  describe('AuthController (e2e)', () => {
    it('/signup (POST)', () => {
      return request(f.app.getHttpServer())
        .post('/signup')
        .send(f.user)
        .expect(201)
        .expect(({ body }) => {
          expect(body.email).toBe(f.user.email)
        })
    })

    it('/login (POST)', () => {
      return request(f.app.getHttpServer())
        .post('/login')
        .send(f.user)
        .expect(200)
        .expect(({ body }) => {
          expect(body.email).toBe(f.user.email)
        })
    })
  })
