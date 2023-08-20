import prisma from "../config/prisma";
import { inputTvShowObject } from "../utils/InputTypes";

export default class TVShows {
	static getAll() {
		return prisma.tvShows.findMany();
	}

	static async getRandom() {
		const skip = Math.floor(Math.random() * (await prisma.tvShows.count()));
		return prisma.tvShows.findMany({
			take: 1,
			skip,
		});
	}

	static getTotal() {
		return prisma.tvShows.count();
	}

	static getById(tvshow_id: string) {
		return prisma.tvShows.findUnique({
			where: {
				id: tvshow_id,
			},
		});
	}

	static searchTitle(tvShowTitle: string) {
		return prisma.tvShows.findMany({
			where: {
				title: {
					contains: tvShowTitle,
					mode: "insensitive",
				},
			},
		});
	}

	static create(tvShowObject: inputTvShowObject) {
		return prisma.tvShows.create({
			data: {
				title: tvShowObject.title,
				year_release: Number(tvShowObject.year_release),
				image: tvShowObject.image,
				tmdb_link: tvShowObject.tmdb_link,
				tmdb_rating: Number(tvShowObject.tmdb_rating),
				justwatch_link: tvShowObject.justwatch_link,
				resume: tvShowObject.resume,
				duration: tvShowObject.duration,
				genres: tvShowObject.genres,
			},
		});
	}

	static update(tvShowObject: inputTvShowObject) {
		return prisma.tvShows.update({
			where: {
				id: tvShowObject.id,
			},
			data: {
				id: tvShowObject.id,
				title: tvShowObject.title,
				year_release: Number(tvShowObject.year_release),
				image: tvShowObject.image,
				tmdb_link: tvShowObject.tmdb_link,
				tmdb_rating: Number(tvShowObject.tmdb_rating),
				justwatch_link: tvShowObject.justwatch_link,
				resume: tvShowObject.resume,
				duration: tvShowObject.duration,
				genres: tvShowObject.genres,
				updated_at: new Date(),
			},
		});
	}

	static delete(movie_id: string) {
		return prisma.tvShows.delete({
			where: {
				id: movie_id,
			},
		});
	}
}
