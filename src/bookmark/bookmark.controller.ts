import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { JwtGuard } from '@/auth/auth.jwt'
import { GetUser } from '@/auth/decorator'

import { CreateBookmarkDto, EditBookmarkDto } from './bookmark.dto'
import { BookmarkEntity } from './bookmark.entity'
import { BookmarkService } from './bookmark.service'

@ApiBearerAuth()
@ApiTags('bookmark')
@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @ApiCreatedResponse({ type: Array<BookmarkEntity> })
  @Get()
  getBookmarks(@GetUser('id') userId: string) {
    return this.bookmarkService.getBookmarks(userId)
  }

  @ApiCreatedResponse({ type: BookmarkEntity })
  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: string,
    @Param('id') bookmarkId: string,
  ) {
    return this.bookmarkService.getBookmarkById(userId, bookmarkId)
  }

  @ApiCreatedResponse({ type: BookmarkEntity })
  @Post()
  createBookmark(
    @GetUser('id') userId: string,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, dto)
  }

  @ApiCreatedResponse({ type: BookmarkEntity })
  @Patch(':id')
  editBookmarkById(
    @GetUser('id') userId: string,
    @Param('id') bookmarkId: string,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmarkById(userId, bookmarkId, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: string,
    @Param('id') bookmarkId: string,
  ) {
    return this.bookmarkService.deleteBookmarkById(userId, bookmarkId)
  }
}
