import { Injectable, Logger, OnModuleInit } from '@nestjs/common'

import { PrismaClient } from '@/generated/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name)

  async onModuleInit() {
    try {
      await this.$connect()
      this.logger.log('Successfully connected to DB!')
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
