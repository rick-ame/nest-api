import * as request from 'supertest'

import { fixture as f } from '../helper'

export default () =>
  describe('UserController (e2e)', () => {
    it('/users/me (GET)', () => {
      request(f.app.getHttpServer())
        .get('/users/me')
        .expect(200)
        .expect(({ body }) => {
          expect(body.email).toBe(f.user.email)

          f.user = body
        })
    })

    it('/users/:id (PATCH)', () => {
      request(f.app.getHttpServer())
        .patch(`/users/${f.user.id}`)
        .expect(200)
        .send({
          firstName: 'hello',
          lastName: 'world',
        })
        .expect(({ body }) => {
          expect(body.firstName + body.lastName).toBe('helloworld')
        })
    })
  })
