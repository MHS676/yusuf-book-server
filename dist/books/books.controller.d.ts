import { BooksService } from './books.service.js';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    findAll(): Promise<any[]>;
    create(createBookDto: any): Promise<{
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
