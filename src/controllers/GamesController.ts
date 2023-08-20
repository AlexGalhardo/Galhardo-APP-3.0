import { Request, Response } from "express";

import Header from "../utils/Header";
import NumberHelper from "../utils/Numbers";
import Books from "../repositories/Books";
import Games from "../repositories/Games";
import Movies from "../repositories/Movies";
import TVShows from "../repositories/TVShows";
import Users from "../repositories/UsersRepository";

export default class GamesController {
    static async getViewGames(req: Request, res: Response) {
        const game = await Games.getRandom();
        const totalGames = await Games.getTotal();
        const totalBooks = await Books.getTotal();
        const totalMovies = await Movies.getTotal();
        const totalTVShows = await TVShows.getTotal();
        const totalItensShopCart = await Users.getTotalItensShopCart();
        game.price = NumberHelper.toFloat(game.price as unknown as string);

        return res.render("pages/games", {
            flash_success: req.flash("success"),
            flash_warning: req.flash("warning"),
            game,
            totalGames,
            totalBooks,
            totalMovies,
            totalTVShows,
            totalItensShopCart: totalItensShopCart ?? 0,
            user: global.SESSION_USER,
            app_url: process.env.APP_URL,
            header: Header.games(),
        });
    }

    static async getSearchGameTitle(req: Request, res: Response) {
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
                flash_success: `${
                    searchedGames.length
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
