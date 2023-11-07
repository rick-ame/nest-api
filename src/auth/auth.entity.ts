import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class AuthEntity implements User {
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

  constructor(partial: Partial<AuthEntity>) {
    Object.assign(this, partial)
  }
}
