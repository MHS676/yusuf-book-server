import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { BooksModule } from './books/books.module.js';

@Module({
  imports: [PrismaModule, BooksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
