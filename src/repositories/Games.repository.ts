import prisma from "../config/prisma";
import { inputGameObject } from "../utils/InputTypes";

export default class Games {
    static getAll() {
        return prisma.game.findMany();
    }

    static async getRandom() {
        const skip = Math.floor(Math.random() * (await prisma.game.count()));
        const game = await prisma.game.findMany({
            take: 1,
            skip,
        });

        return game[0];
    }

    static getTotal() {
        return prisma.game.count();
    }

    static getById(game_id: string) {
        return prisma.game.findUnique({
            where: {
                id: game_id,
            },
        });
    }

    static searchTitle(gameTitle: string) {
        return prisma.game.findMany({
            where: {
                title: {
                    contains: gameTitle,
                    mode: "insensitive",
                },
            },
        });
    }

    static create(gameObject: inputGameObject) {
        return prisma.game.create({
            data: {
                title: gameObject.title,
                price: parseInt(gameObject.price),
                year_release: parseInt(gameObject.year_release),
                platforms: gameObject.platforms,
                genres: gameObject.genres,
                developer: gameObject.developer,
                image: gameObject.image,
                igdb_link: gameObject.igdb_link,
                igdb_rating: parseInt(gameObject.igdb_rating),
                amazon_link: gameObject.amazon_link,
                resume: gameObject.resume,
            },
        });
    }

    static update(gameObject: inputGameObject) {
        return prisma.game.update({
            where: {
                id: gameObject.id,
            },
            data: {
                id: gameObject.id,
                title: gameObject.title,
                price: parseInt(gameObject.price),
                year_release: parseInt(gameObject.year_release),
                platforms: gameObject.platforms,
                genres: gameObject.genres,
                developer: gameObject.developer,
                image: gameObject.image,
                igdb_link: gameObject.igdb_link,
                igdb_rating: parseInt(gameObject.igdb_rating),
                amazon_link: gameObject.amazon_link,
                resume: gameObject.resume,
                updated_at: new Date(),
            },
        });
    }

    static delete(game_id: string) {
        return prisma.game.delete({
            where: {
                id: game_id,
            },
        });
    }
}
