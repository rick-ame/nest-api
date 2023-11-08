import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  // use pre-defined variable in webpack this section could be dead code in build result,
  // would not affect product env even with wrong env config
  if (globalThis.ENABLE_SWAGGER) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Nest API')
        .setDescription('NestJS Demo API')
        .setVersion(globalThis.VERSION)
        .addBearerAuth()
        .build(),
    )
    SwaggerModule.setup('docs', app, document)
  }

  await app.listen(app.get(ConfigService).get('PORT') || 3000)
}

bootstrap()
