import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  findByBook(bookId: string) {
    return this.prisma.comment.findMany({
      where: { bookId, parentId: null },
      include: { replies: { orderBy: { createdAt: 'asc' } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async create(input: { bookId: string; text: string; userName: string; parentId?: string }) {
    const text = input.text?.trim();
    const userName = input.userName?.trim();
    if (!input.bookId || !text || !userName) {
      throw new BadRequestException('bookId, text, and userName are required.');
    }

    const book = await this.prisma.book.findUnique({ where: { id: input.bookId }, select: { id: true } });
    if (!book) throw new NotFoundException('Book not found.');

    if (input.parentId) {
      const parent = await this.prisma.comment.findUnique({ where: { id: input.parentId } });
      if (!parent || parent.bookId !== input.bookId || parent.parentId) {
        throw new BadRequestException('Replies must reference a top-level comment on the same book.');
      }
    }

    return this.prisma.comment.create({
      data: { bookId: input.bookId, text, userName, parentId: input.parentId || null },
      include: { replies: true },
    });
  }
}
