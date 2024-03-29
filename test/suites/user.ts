import * as request from 'supertest'

import { fixture as f } from '../helper'

export default () =>
  describe('UserController (e2e)', () => {
    it('/users/me (GET)', () => {
      return request(f.app.getHttpServer())
        .get('/users/me')
        .set(f.authHeader)
        .expect(200)
        .expect(({ body }) => {
          expect(body.email).toBe(f.user.email)
        })
    })

    it('/users (PATCH)', () => {
      return request(f.app.getHttpServer())
        .patch('/users')
        .set(f.authHeader)
        .send({
          firstName: 'hello',
          lastName: 'world',
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.firstName + body.lastName).toBe('helloworld')
        })
    })
  })
