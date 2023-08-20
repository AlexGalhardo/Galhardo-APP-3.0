import { Request, Response, NextFunction, Router } from "express";

import AdminController from "../controllers/Admin.controller";

const router = Router();

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	if (!global.SESSION_USER || !global.SESSION_USER.admin) return res.redirect("/");
	return next();
};

export default router
	.get("/create/blogPost", isAdmin, AdminController.getViewCreateBlogPost)
	.post("/create/blogPost", isAdmin, AdminController.postCreateBlogPost)

	.get("/update/blogPost/:blog_id", isAdmin, AdminController.getViewUpdateBlogPost)
	.post("/update/blogPost/:blog_id", isAdmin, AdminController.postUpdateBlogPost)

	.post("/delete/blogPost/:blog_id", isAdmin, AdminController.postDeleteBlogPost)

	.get("/create/game", isAdmin, AdminController.getViewCreateGame)
	.post("/create/game", isAdmin, AdminController.postCreateGame)

	.get("/update/game/:game_id", isAdmin, AdminController.getViewUpdateGame)
	.post("/update/game/:game_id", isAdmin, AdminController.postUpdateGame)

	.post("/delete/game/:game_id", isAdmin, AdminController.postDeleteGame)

	.get("/create/book", isAdmin, AdminController.getViewCreateBook)
	.post("/create/book", isAdmin, AdminController.postCreateBook)

	.get("/update/book/:book_id", isAdmin, AdminController.getViewUpdateBook)
	.post("/update/book/:book_id", isAdmin, AdminController.postUpdateBook)

	.post("/delete/book/:book_id", isAdmin, AdminController.postDeleteBook)

	.get("/create/movie", isAdmin, AdminController.getViewCreateMovie)
	.post("/create/movie", isAdmin, AdminController.postCreateMovie)

	.get("/update/movie/:movie_id", isAdmin, AdminController.getViewUpdateMovie)
	.post("/update/movie/:movie_id", isAdmin, AdminController.postUpdateMovie)

	.post("/delete/movie/:movie_id", isAdmin, AdminController.postDeleteMovie)

	.get("/create/tvshow", isAdmin, AdminController.getViewCreateTVShow)
	.post("/create/tvshow", isAdmin, AdminController.postCreateTVShow)
	.get("/update/tvshow/:tvshow_id", isAdmin, AdminController.getViewUpdateTVShow)
	.post("/update/tvshow/:tvshow_id", isAdmin, AdminController.postUpdateTVShow)
	.post("/delete/tvshow/:tvshow_id", isAdmin, AdminController.postDeleteTVShow);
