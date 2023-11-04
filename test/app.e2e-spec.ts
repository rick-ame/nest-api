import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { initApp } from './util'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    app = await initApp()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200)
  })
})
