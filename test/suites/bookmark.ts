import * as request from 'supertest'

import { fixture as f } from '../helper'

export default () =>
  describe('BookmarkController (e2e)', () => {
    it('/bookmarks (POST)', () => {
      return request(f.app.getHttpServer())
        .post('/bookmarks')
        .set(f.authHeader)
        .send(f.bookmark)
        .expect(201)
        .expect(({ body }) => {
          expect(body.title).toBe(f.bookmark.title)

          f.bookmark = body
        })
    })

    it('/bookmarks (GET)', () => {
      return request(f.app.getHttpServer())
        .get('/bookmarks')
        .set(f.authHeader)
        .expect(200)
        .expect(({ body }) => {
          expect(body).toHaveLength(1)
        })
    })

    it('/bookmarks/:id (GET)', () => {
      return request(f.app.getHttpServer())
        .get(`/bookmarks/${f.bookmark.id}`)
        .set(f.authHeader)
        .expect(200)
        .expect(({ body }) => {
          expect(body.title).toBe(f.bookmark.title)
        })
    })

    it('/bookmarks/:id (PATCH)', () => {
      return request(f.app.getHttpServer())
        .patch(`/bookmarks/${f.bookmark.id}`)
        .set(f.authHeader)
        .send({
          title: 'Bookmark New Title',
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.title).toBe('Bookmark New Title')
        })
    })

    it('/bookmarks/:id (DELETE)', () => {
      return request(f.app.getHttpServer())
        .delete(`/bookmarks/${f.bookmark.id}`)
        .set(f.authHeader)
        .expect(204)
    })
  })
