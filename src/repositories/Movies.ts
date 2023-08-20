import prisma from "../config/prisma";
import { inputMovieObject } from "../utils/InputTypes";

export default class Movies {
    static getAll() {
        return prisma.movie.findMany();
    }

    static async getRandom() {
        const skip = Math.floor(Math.random() * (await prisma.movie.count()));
        return prisma.movie.findMany({
            take: 1,
            skip,
        });
    }

    static getTotal() {
        return prisma.movie.count();
    }

    static getById(movie_id: string) {
        return prisma.movie.findUnique({
            where: {
                id: movie_id,
            },
        });
    }

    static searchTitle(movieTitle: string) {
        return prisma.movie.findMany({
            where: {
                title: {
                    contains: movieTitle,
                    mode: "insensitive",
                },
            },
        });
    }

    static create(movieObject: inputMovieObject) {
        return prisma.movie.create({
            data: {
                title: movieObject.title,
                year_release: Number(movieObject.year_release),
                image: movieObject.image,
                tmdb_link: movieObject.tmdb_link,
                tmdb_rating: Number(movieObject.tmdb_rating),
                justwatch_link: movieObject.justwatch_link,
                resume: movieObject.resume,
                duration: movieObject.duration,
                genres: movieObject.genres,
            },
        });
    }

    static update(movieObject: inputMovieObject) {
        return prisma.movie.update({
            where: {
                id: movieObject.id,
            },
            data: {
                id: movieObject.id,
                title: movieObject.title,
                year_release: Number(movieObject.year_release),
                image: movieObject.image,
                tmdb_link: movieObject.tmdb_link,
                tmdb_rating: Number(movieObject.tmdb_rating),
                justwatch_link: movieObject.justwatch_link,
                resume: movieObject.resume,
                duration: movieObject.duration,
                genres: movieObject.genres,
                updated_at: new Date(),
            },
        });
    }

    static delete(movie_id: string) {
        return prisma.movie.delete({
            where: {
                id: movie_id,
            },
        });
    }
}
