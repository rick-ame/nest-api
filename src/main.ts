import { INestApplication, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestApplication, NestFactory } from '@nestjs/core'
import { Application } from 'express'

import { AppModule } from './app.module'
import { document, globalUse } from './hydrate'

async function bootstrap() {
  const app = await NestFactory.create<INestApplication<Application>>(AppModule)

  const logger = new Logger(NestApplication.name)

  globalUse(app)

  // use pre-defined variable in webpack this section could be dead code in build result,
  // would not affect product env even with wrong env config
  const enableSwagger = Boolean(globalThis.ENABLE_SWAGGER)
  if (enableSwagger) {
    document(app)
  }

  const PORT: string = app.get(ConfigService).get('PORT')!
  await app.listen(PORT, async () => {
    logger.log(`Server running at port: ${PORT}`)

    if (enableSwagger) {
      logger.log(`Check swagger - http://localhost:${PORT}/docs`)
    }
  })
}

void bootstrap()
