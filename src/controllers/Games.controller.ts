import { Request, Response } from "express";

import Header from "../utils/Header";
import Numbers from "../utils/Numbers";
import Books from "../repositories/Books.repository";
import Games from "../repositories/Games.repository";
import Movies from "../repositories/Movies.repository";
import TVShows from "../repositories/TVShows.repository";
import UsersRepository, { UsersRepositoryPort } from "../repositories/Users.repository";

export default class GamesController {
	constructor(
		private readonly usersRepository: UsersRepositoryPort = new UsersRepository()
		// private readonly gamesRepository = new GamesRepository()
	) { }

	async getViewGames(req: Request, res: Response) {
		const game = await Games.getRandom();
		const totalGames = await Games.getTotal();
		const totalBooks = await Books.getTotal();
		const totalMovies = await Movies.getTotal();
		const totalTVShows = await TVShows.getTotal();
		// const totalItensShopCart = await this.usersRepository.getTotalItensShopCart()
		game.price = Numbers.toFloat(game.price as unknown as string);

		return res.render("pages/games", {
			flash_success: req.flash("success"),
			flash_warning: req.flash("warning"),
			game,
			totalGames,
			totalBooks,
			totalMovies,
			totalTVShows,
			totalItensShopCart: 0,
			user: global.SESSION_USER,
			app_url: process.env.APP_URL,
			header: Header.games(),
		});
	}

	async getSearchGameTitle(req: Request, res: Response) {
		const searchGameTitle = req.query.title;

		if (!searchGameTitle) {
			return res.redirect("/");
		}

		const searchedGames = await Games.searchTitle(searchGameTitle as string);

		if (!searchedGames.length) {
			req.flash("warning", `No games found from search: ${searchGameTitle}! Recommending a Random Game`);
			return res.redirect("/");
		}

		if (searchedGames.length > 1) {
			searchedGames[0].firstGame = true;
			return res.render("pages/games", {
				flash_success: `${searchedGames.length
					} Games Found From Search Title: ${searchGameTitle.toUpperCase()}`,
				games: searchedGames,
				user: global.SESSION_USER,
				header: Header.games(),
			});
		}

		return res.render("pages/games", {
			flash_success: `1 Game Found From Search Title: ${searchGameTitle.toUpperCase()}`,
			game: searchedGames[0],
			user: global.SESSION_USER,
			header: Header.games(),
		});
	}
}
