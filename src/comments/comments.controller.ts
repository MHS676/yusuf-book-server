import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service.js';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('book/:bookId')
  findByBook(@Param('bookId') bookId: string) {
    return this.commentsService.findByBook(bookId);
  }

  @Post()
  create(@Body() body: { bookId: string; text: string; userName: string; parentId?: string }) {
    return this.commentsService.create(body);
  }
}
