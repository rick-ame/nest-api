import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { initApp } from './util'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await initApp()
  })
  afterAll(async () => {
    await app.close()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200)
  })
})
