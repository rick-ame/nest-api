import * as request from 'supertest'

import { fixture as f } from '../helper'

export default () =>
  describe('BookmarkController (e2e)', () => {
    it('/bookmarks (POST)', () => {
      request(f.app.getHttpServer())
        .post('/bookmarks')
        .expect(200)
        .send(f.bookmark)
        .expect(({ body }) => {
          expect(body.title).toBe(f.bookmark.title)

          f.bookmark = body
        })
    })

    it('/bookmarks (GET)', () => {
      request(f.app.getHttpServer())
        .get('/bookmarks')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toHaveLength(1)
        })
    })

    it('/bookmarks/:id (GET)', () => {
      request(f.app.getHttpServer())
        .get(`/bookmarks/${f.bookmark.id}`)
        .expect(200)
        .expect(({ body }) => {
          expect(body.title).toBe(f.bookmark.title)
        })
    })

    it('/bookmarks/:id (PATCH)', () => {
      request(f.app.getHttpServer())
        .patch(`/bookmarks/${f.bookmark.id}`)
        .expect(200)
        .send({
          title: 'Bookmark New Title',
        })
        .expect(({ body }) => {
          expect(body.title).toBe('Bookmark New Title')
        })
    })

    it('/bookmarks/:id (DELETE)', () => {
      request(f.app.getHttpServer())
        .delete(`/bookmarks/${f.bookmark.id}`)
        .expect(204)
    })
  })
