import { ApiPropertyOptional } from '@nestjs/swagger'

import { Bookmark } from '@/generated/prisma'

export class BookmarkEntity implements Bookmark {
  id: string
  userId: string
  createdAt: Date
  updatedAt: Date

  title: string

  @ApiPropertyOptional()
  description: string | null

  link: string
}
