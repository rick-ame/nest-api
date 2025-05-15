import { Controller, Get, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { BookmarkModule } from './bookmark/bookmark.module'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'

const config = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('env DATABASE_URL is required!')
  }

  const JWT_SECRET = process.env.JWT_SECRET
  if (!JWT_SECRET) {
    throw new Error('env JWT_SECRET is required!')
  }

  const PORT = process.env.PORT || '3000'

  return {
    JWT_SECRET,
    PORT,
  }
}

@Controller()
class AppController {
  @Get()
  getVersion() {
    return {
      version: globalThis.VERSION,
    }
  }

  @Get('healthcheck')
  healthCheck() {
    return 'Version: ' + globalThis.VERSION
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    BookmarkModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
