import { INestApplication } from '@nestjs/common'

interface Fixture {
  app: INestApplication
}
export const fixture = {
  app: undefined,
} as unknown as Fixture
