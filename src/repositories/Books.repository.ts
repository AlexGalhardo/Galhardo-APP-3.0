import prisma from "../config/prisma";
import { inputBookObject } from "../utils/InputTypes";

export default class Books {
    static getAll() {
        return prisma.book.findMany();
    }

    static async getRandom() {
        const skip = Math.floor(Math.random() * (await prisma.book.count()));
        const book = await prisma.book.findMany({
            take: 1,
            skip,
        });

        return book[0];
    }

    static getTotal() {
        return prisma.book.count();
    }

    static getById(book_id: string) {
        return prisma.book.findUnique({
            where: {
                id: book_id,
            },
        });
    }

    static searchTitle(bookTitle: string) {
        return prisma.book.findMany({
            where: {
                title: {
                    contains: bookTitle,
                    mode: "insensitive",
                },
            },
        });
    }

    static create(bookObject: inputBookObject) {
        return prisma.book.create({
            data: {
                title: bookObject.title,
                year_release: Number(bookObject.year_release),
                price: bookObject.price,
                image: bookObject.image,
                genres: bookObject.genres,
                pages: Number(bookObject.pages),
                author: bookObject.author,
                amazon_link: bookObject.amazon_link,
                resume: bookObject.resume,
            },
        });
    }

    static update(bookObject: inputBookObject) {
        return prisma.book.update({
            where: {
                id: bookObject.id,
            },
            data: {
                id: bookObject.id,
                title: bookObject.title,
                year_release: Number(bookObject.year_release),
                price: bookObject.price,
                image: bookObject.image,
                genres: bookObject.genres,
                pages: Number(bookObject.pages),
                author: bookObject.author,
                amazon_link: bookObject.amazon_link,
                resume: bookObject.resume,
                updated_at: new Date(),
            },
        });
    }

    static delete(book_id: string) {
        return prisma.book.delete({
            where: {
                id: book_id,
            },
        });
    }
}
