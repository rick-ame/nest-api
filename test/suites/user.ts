import * as request from 'supertest'

import { fixture as f } from '../helper'

export default () =>
  describe('UserController (e2e)', () => {
    it('/users/me (GET)', () => {
      return request(f.app.getHttpServer())
        .get('/users/me')
        .expect(200)
        .expect(({ body }) => {
          f.user = body

          expect(body.email).toBe(f.user.email)
        })
    })

    it('/users/:id (PATCH)', () => {
      return request(f.app.getHttpServer())
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
