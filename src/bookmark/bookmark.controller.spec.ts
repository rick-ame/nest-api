import { Test } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'

import { PrismaService } from '@/prisma/prisma.service'

import { BookmarkController } from './bookmark.controller'
import { BookmarkService } from './bookmark.service'

describe('BookmarkController', () => {
  let bookmarkController: BookmarkController
  let prismaMock: DeepMockProxy<PrismaClient>

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      controllers: [BookmarkController],
      providers: [BookmarkService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile()
    bookmarkController = app.get(BookmarkController)
    prismaMock = app.get(PrismaService)
  })

  it('can get all bookmarks of user', () => {
    prismaMock.bookmark.findMany.mockResolvedValue([
      {
        id: 'id',
        createdAt: new Date(),
        updatedAt: new Date(),

        title: 'Bookmark',
        description: '',
        link: '',

        userId: 'userId',
      },
    ])

    expect(bookmarkController.getBookmarks('userId')).resolves.toHaveLength(1)
  })

  it('can get bookmark by its id', () => {
    prismaMock.bookmark.findUnique.mockResolvedValue({
      id: 'id',
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'Bookmark',
      description: '',
      link: '',
      userId: 'userId',
    })

    expect(
      bookmarkController.getBookmarkById('userId', 'id'),
    ).resolves.toHaveProperty('title', 'Bookmark')
  })

  it('can create bookmark', () => {
    const bookmark = {
      title: 'Bookmark',
      description: '',
      link: '',
    }
    prismaMock.bookmark.create.mockResolvedValue({
      ...bookmark,
      id: 'id',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'userId',
    })

    expect(
      bookmarkController.createBookmark('userId', bookmark),
    ).resolves.toHaveProperty('title', bookmark.title)
  })

  it('can edit bookmark by its id', () => {
    const bookmark = {
      title: 'Bookmark',
      description: '',
      link: '',
    }
    prismaMock.bookmark.update.mockResolvedValue({
      ...bookmark,
      id: 'id',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 'userId',
    })

    expect(
      bookmarkController.editBookmarkById('userId', 'id', bookmark),
    ).resolves.toHaveProperty('title', 'Bookmark')
  })

  it('can delete bookmark by its id', () => {
    expect(
      bookmarkController.deleteBookmarkById('userId', 'id'),
    ).resolves.toBeUndefined()
  })
})
