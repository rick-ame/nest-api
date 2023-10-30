import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from '@/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  // use pre-defined variable in webpack this section could be dead code in build result,
  // would not affect product env even with wrong env config
  if (globalThis.ENABLE_SWAGGER) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Nest API')
        .setVersion(globalThis.VERSION)
        .build(),
    )
    SwaggerModule.setup('docs', app, document)
  }

  await app.listen(configService.get('PORT') || 3000)
}
bootstrap()
