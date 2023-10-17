import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hello World!'
  }

  @Get('version')
  getVersion() {
    return {
      version: globalThis.VERSION,
    }
  }
}
