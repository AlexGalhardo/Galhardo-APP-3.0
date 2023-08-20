import axios from "axios";
import { calcularPrecoPrazo } from "correios-brasil";
import { Router, Request, Response } from "express";

import APIController from "../controllers/API/APIController";
import APIProfileController from "../controllers/API/APIProfileController";
import APIPublicController from "../controllers/API/APIPublicController";

const router = Router();

export default router
    .get("/", APIController.getWelcomeToAPI)
    .get("/public", APIController.getPublicEndpoints)
    .get("/admin", APIController.getAdminEndpoints)

    .get("/public/email/:email", APIPublicController.verifyIfEmailIsAlreadyRegistred)

    .get("/public/blog", APIPublicController.getPublicBlog)
    .get("/public/blog/random", APIPublicController.getPublicBlogRandom)
    .get("/public/blog/:blog_id", APIPublicController.getPublicBlogByID)

    .get("/public/games", APIPublicController.getPublicGames)
    .get("/public/games/random", APIPublicController.getPublicRandomGame)
    .get("/public/games/:game_id", APIPublicController.getPublicGameByID)

    .get("/public/books", APIPublicController.getPublicBooks)
    .get("/public/books/random", APIPublicController.getPublicRandomBook)
    .get("/public/books/:book_id", APIPublicController.getPublicBookByID)

    .get("/public/movies", APIPublicController.getPublicMovies)
    .get("/public/movies/random", APIPublicController.getPublicRandomMovie)
    .get("/public/movies/:movie_id", APIPublicController.getPublicMovieByID)

    .get("/public/tvshows", APIPublicController.getPublicTVShows)
    .get("/public/tvshows/random", APIPublicController.getPublicRandomTVShow)
    .get("/public/tvshows/:tvshow_id", APIPublicController.getPublicTVShowByID)

    .post("/profile/login", APIProfileController.postLogin)
    .patch("/profile/patch", APIProfileController.patchProfile)
    .delete("/profile/delete", APIProfileController.deleteProfile)

    .get("/addCart/game/:game_id", APIPublicController.addGameToCart)

    .get("/addCart/book/:book_id", APIPublicController.addBookToCart)

    .get("/shipping/:zipcode", async (req, res) => {
        const { zipcode } = req.params;

        const args = {
            sCepOrigem: "16050590",
            sCepDestino: zipcode,
            nVlPeso: "5",
            nCdFormato: "1",
            nVlComprimento: "20",
            nVlAltura: "20",
            nVlLargura: "20",
            nCdServico: ["04014"],
            nVlDiametro: "0",
        };

        const response = await calcularPrecoPrazo(args);

        res.json(response);
    })

    .get("/cep/:cep", async (req: Request, res: Response) => {
        const { cep } = req.params;

        const request = await axios.get(`http://viacep.com.br/ws/${cep}/json`);

        return res.json(request.data);
    });
