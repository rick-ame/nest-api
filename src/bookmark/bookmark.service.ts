import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '@/prisma/prisma.service'

import { CreateBookmarkDto, EditBookmarkDto } from './bookmark.dto'

@Injectable()
export class BookmarkService {
  constructor(private readonly prisma: PrismaService) {}

  async getBookmarks(userId: string) {
    return await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    })
  }

  async getBookmarkById(userId: string, bookmarkId: string) {
    const bookmark = this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
        userId,
      },
    })

    if (!bookmark) throw new NotFoundException('Bookmark not found')

    return bookmark
  }

  async createBookmark(userId: string, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        ...dto,
        userId,
      },
    })
    return bookmark
  }

  async editBookmarkById(
    userId: string,
    bookmarkId: string,
    dto: EditBookmarkDto,
  ) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
        userId,
      },
    })

    if (!bookmark) throw new NotFoundException('Bookmark not found')

    return await this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: dto,
    })
  }

  async deleteBookmarkById(userId: string, bookmarkId: string) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
        userId,
      },
    })

    if (!bookmark) throw new NotFoundException('Bookmark not found')

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    })
  }
}
