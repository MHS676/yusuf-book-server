import { PrismaService } from '../prisma/prisma.service.js';
export declare class BooksService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<any[]>;
    create(data: {
        title: string;
        author: string;
        category?: string;
        subCategory?: string;
        cover?: string;
        pages: string[];
    }): Promise<{
        pages: {
            id: string;
            pageNumber: number;
            content: string;
            bookId: string;
        }[];
    } & {
        id: string;
        title: string;
        author: string;
        category: string | null;
        subCategory: string | null;
        cover: string | null;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
