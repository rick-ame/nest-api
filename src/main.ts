import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { document, globalUse } from './hydrate'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  globalUse(app)

  // use pre-defined variable in webpack this section could be dead code in build result,
  // would not affect product env even with wrong env config
  if (globalThis.ENABLE_SWAGGER) {
    document(app)
  }

  await app.listen(app.get(ConfigService).get('PORT') || 3000)
}

void bootstrap()
