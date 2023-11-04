import { Test, TestingModule } from '@nestjs/testing'

import { AppModule } from '@/app.module'

export const initApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const app = moduleFixture.createNestApplication()
  await app.init()

  return app
}
