import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { BooksModule } from './books/books.module.js';
import { CommentsModule } from './comments/comments.module.js';

@Module({
  imports: [PrismaModule, BooksModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
