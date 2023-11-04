import { Controller, Get, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'

@Controller()
class AppController {
  @Get()
  getVersion() {
    return {
      version: globalThis.VERSION,
    }
  }
}

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [AppController],
})
export class AppModule {}
