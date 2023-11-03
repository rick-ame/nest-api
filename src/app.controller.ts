import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getVersion() {
    return {
      version: globalThis.VERSION,
    }
  }
}
