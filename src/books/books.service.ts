import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const books = await this.prisma.book.findMany({
      include: { pages: { orderBy: { pageNumber: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });

    return books.map((book: any) => ({
      ...book,
      pages: book.pages.map((p: any) => p.content),
    }));
  }

  async create(data: {
    title: string;
    author: string;
    category?: string;
    subCategory?: string;
    cover?: string;
    pages: string[];
  }) {
    const { pages, ...bookData } = data;

    return this.prisma.book.create({
      data: {
        ...bookData,
        pages: {
          create: pages.map((content: string, index: number) => ({
            content,
            pageNumber: index + 1,
          })),
        },
      },
      include: { pages: true },
    });
  }

  async remove(id: string) {
    const result = await this.prisma.book.deleteMany({ where: { id } });
    return { deleted: result.count > 0 };
  }
}
