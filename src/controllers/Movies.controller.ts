import { Request, Response } from "express";

import Header from "../utils/Header";
import Books from "../repositories/Books.repository";
import Games from "../repositories/Games.repository";
import Movies from "../repositories/Movies.repository";
import TVShows from "../repositories/TVShows.repository";

export default class MoviesController {
	static async getViewMovies(req: Request, res: Response) {
		const movie = await Movies.getRandom();
		const totalGames = await Games.getTotal();
		const totalBooks = await Books.getTotal();
		const totalMovies = await Movies.getTotal();
		const totalTVShows = await TVShows.getTotal();

		return res.render("pages.movies", {
			flash_success: req.flash("success"),
			flash_warning: req.flash("warning"),
			movie,
			totalGames,
			totalBooks,
			totalMovies,
			totalTVShows,
			user: global.SESSION_USER,
			app_url: process.env.APP_URL,
			header: Header.movies(),
		});
	}

	static async getSearchMovieTitle(req: Request, res: Response) {
		const searchMovieTitle = req.query.title;

		if (!searchMovieTitle) {
			return res.redirect("/");
		}

		const searchedMovies = await Movies.searchTitle(searchMovieTitle as string);

		if (!searchedMovies.length) {
			req.flash("warning", `No movies found from search: ${searchMovieTitle}! Recommending a Random Movie`);
			return res.redirect("/");
		}

		if (searchedMovies.length > 1) {
			searchedMovies[0].firstMovie = true;
			return res.render("pages.movies", {
				flash_success: `${searchedMovies.length
					} Games Found From Search Title: ${searchMovieTitle.toUpperCase()}`,
				movies: searchedMovies,
				user: global.SESSION_USER,
				header: Header.movies(),
			});
		}

		return res.render("pages.movies", {
			flash_success: `1 Game Found From Search Title: ${searchMovieTitle.toUpperCase()}`,
			movie: searchedMovies[0],
			user: global.SESSION_USER,
			header: Header.movies(),
		});
	}
}
