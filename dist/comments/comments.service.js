var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let CommentsService = class CommentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findByBook(bookId) {
        return this.prisma.comment.findMany({
            where: { bookId, parentId: null },
            include: { replies: { orderBy: { createdAt: 'asc' } } },
            orderBy: { createdAt: 'asc' },
        });
    }
    async create(input) {
        const text = input.text?.trim();
        const userName = input.userName?.trim();
        if (!input.bookId || !text || !userName) {
            throw new BadRequestException('bookId, text, and userName are required.');
        }
        const book = await this.prisma.book.findUnique({ where: { id: input.bookId }, select: { id: true } });
        if (!book)
            throw new NotFoundException('Book not found.');
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
};
CommentsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CommentsService);
export { CommentsService };
//# sourceMappingURL=comments.service.js.map