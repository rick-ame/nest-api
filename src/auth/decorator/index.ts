import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { UserEntity } from '../auth.entity'

export const GetUser = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    if (data) {
      return request.user[data]
    }
    return request.user
  },
)
