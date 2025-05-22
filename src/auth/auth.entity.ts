import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

import { User } from '@/generated/prisma'

export class UserEntity implements User {
  id: string
  createdAt: Date
  updatedAt: Date
  email: string

  @ApiPropertyOptional()
  firstName: string | null

  @ApiPropertyOptional()
  lastName: string | null

  @ApiHideProperty()
  @Exclude()
  hash: string

  constructor(payload: Partial<UserEntity>) {
    Object.assign(this, payload)
  }
}

export class AuthEntity extends UserEntity {
  accessToken: string

  constructor(payload: AuthEntity) {
    super(payload)
    this.accessToken = payload.accessToken
  }
}
