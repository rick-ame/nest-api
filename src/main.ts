import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from '@/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

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
