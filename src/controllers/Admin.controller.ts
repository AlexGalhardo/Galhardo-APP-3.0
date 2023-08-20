import { Request, Response } from "express";

import Blog from "../repositories/Blog.repository";
import Books from "../repositories/Books.repository";
import Games from "../repositories/Games.repository";
import Movies from "../repositories/Movies.repository";
import TVShows from "../repositories/TVShows.repository";
import { createBlogDTO } from "src/utils/InputTypes";

export default class AdminController {
	static getViewCreateBlogPost (req: Request, res: Response) {
		return res.render("pages/admin/createBlogPost", {
			flash_success: req.flash("success"),
			flash_warning: req.flash("warning"),
			user: global.SESSION_USER,
		});
	}

	static async postCreateBlogPost (req: Request, res: Response) {
		const { blog_image, blog_title, blog_category, blog_resume, blog_body } = req.body;

		const blogPostObject: createBlogDTO = {
			image: blog_image,
			title: blog_title,
			category: blog_category,
			resume: blog_resume,
			body: blog_body,
		};

		const blogPost = await Blog.create(blogPostObject);

		if (!blogPost) {
			req.flash("warning", `ERROR: Blog Post Not Created!`);
			return res.redirect(`/admin/create/blogPost`);
		}

		req.flash("success", `SUCCESS: Blog Post Created!`);
		return res.redirect(`/admin/update/blogPost/${blogPost.id}`);
	}

	static async getViewUpdateBlogPost (req: Request, res: Response) {
		const { blog_id } = req.params;
		const blogPost = await Blog.getById(blog_id);

		return res.render("pages/admin/updateBlogPost", {
			flash_success: req.flash("success"),
			flash_warning: req.flash("warning"),
			blogPost,
			user: global.SESSION_USER,
		});
	}

	static async postUpdateBlogPost (req: Request, res: Response) {
		const { blog_id, blog_title, blog_resume, blog_image, blog_category, blog_body } = req.body;

		const blogPostObject = {
			id: blog_id,
			title: blog_title,
			resume: blog_resume,
			image: blog_image,
			category: blog_category,
			body: blog_body,
		};

		const blogPost = await Blog.update(blogPostObject);

		if (!blogPost) {
			req.flash("warning", `ERROR: Blog Post Not Updated!`);
			return res.redirect(`/admin/update/blogPost/${blogPost.id}`);
		}

		req.flash("success", `SUCCESS: Blog Post Updated!`);
		return res.redirect(`/admin/update/blogPost/${blogPost.id}`);
	}

	static async postDeleteBlogPost (req: Request, res: Response) {
		const { blog_id } = req.params;

		if (await Blog.delete(blog_id)) {
			req.flash("success", `Blog Post Deleted!`);
			return res.redirect("/admin/create/blogPost");
		}
		req.flash("warning", `Something went wrong!`);
		return res.redirect(`/admin/update/blogPost/${blog_id}`);
	}

	/** ******* GAME ************** */
	static getViewCreateGame (req: Request, res: Response) {
		return res.render("pages/admin/createGame", {
			user: global.SESSION_USER,
		});
	}

	static async postCreateGame (req: Request, res: Response) {
		const {
			game_title,
			game_year_release,
			game_platforms,
			game_genres,
			game_developer,
			game_image,
			game_igdb_link,
			game_igdb_rating,
			game_amazon_link,
			game_resume,
		} = req.body;

		const gameObject = {
			title: game_title,
			year_release: game_year_release,
			platforms: game_platforms,
			genres: game_genres,
			developer: game_developer,
			image: game_image,
			igdb_link: game_igdb_link,
			igdb_rating: game_igdb_rating,
			amazon_link: game_amazon_link,
			resume: game_resume,
		};

		const game = await Games.create(gameObject);

		if (!game) {
			req.flash("warning", `ERROR: Game Not Created!`);
			return res.redirect(`/admin/create/game`);
		}

		req.flash("success", `SUCCESSs: Game Created!`);
		return res.redirect(`/admin/update/game/${game.id}`);
	}

	static async getViewUpdateGame (req: Request, res: Response) {
		const { game_id } = req.params;
		const game = await Games.getById(game_id);

		res.render("pages/admin/updateGame", {
			flash_success: req.flash("success"),
			flash_warning: req.flash("warning"),
			game,
			user: global.SESSION_USER,
		});
	}

	static async postUpdateGame (req: Request, res: Response) {
		const {
			game_id,
			game_title,
			game_price,
			game_year_release,
			game_platforms,
			game_genres,
			game_developer,
			game_image,
			game_igdb_link,
			game_igdb_rating,
			game_amazon_link,
			game_resume,
		} = req.body;

		const gameObject = {
			id: game_id,
			title: game_title,
			price: game_price,
			year_release: game_year_release,
			platforms: game_platforms,
			genres: game_genres,
			developer: game_developer,
			image: game_image,
			igdb_link: game_igdb_link,
			igdb_rating: game_igdb_rating,
			amazon_link: game_amazon_link,
			resume: game_resume,
		};

		const game = await Games.update(gameObject);

		if (!game) {
			req.flash("warning", `Error: game not updated!`);
			return res.redirect(`/admin/update/game/${game_id}`);
		}

		req.flash("success", `SUCCESS: Game Updated!`);
		return res.redirect(`/admin/update/game/${game_id}`);
	}

	static async postDeleteGame (req: Request, res: Response) {
		const { game_id } = req.params;
		if (await Games.delete(game_id)) {
			req.flash("success", `SUCCESS: Game DELETED!`);
			return res.redirect("/");
		}
		req.flash("warning", `ERROR: Game NOT DELETED!`);
		return res.redirect(`/admin/update/game/${game_id}`);
	}

	/** ******* BOOK ************** */
	static getViewCreateBook (req: Request, res: Response) {
		return res.render("pages/admin/createBook", {
			user: global.SESSION_USER,
		});
	}

	static async postCreateBook (req: Request, res: Response) {
		const {
			book_title,
			book_year_release,
			book_image,
			book_amazon_link,
			book_resume,
			book_pages,
			book_genres,
			book_author,
		} = req.body;

		const bookObject = {
			id: null,
			title: book_title,
			year_release: parseInt(book_year_release),
			image: book_image,
			amazon_link: book_amazon_link,
			resume: book_resume,
			pages: parseInt(book_pages),
			genres: book_genres,
			author: book_author,
		};

		const book = await Books.create(bookObject);

		if (!book) {
			req.flash("warning", `Error: Book not created!`);
			return res.redirect(`/admin/create/book`);
		}

		req.flash("warning", `Error: Book not created!`);
		return res.redirect(`/admin/update/book/${book.id}`);
	}

	static async getViewUpdateBook (req: Request, res: Response) {
		const { book_id } = req.params;
		const book = await Books.getById(book_id);

		res.render("pages/admin/updateBook", {
			flash_success: req.flash("success"),
			flash_warning: req.flash("warning"),
			book,
			user: global.SESSION_USER,
		});
	}

	static async postUpdateBook (req: Request, res: Response) {
		const {
			book_id,
			book_title,
			book_year_release,
			book_image,
			book_amazon_link,
			book_resume,
			book_pages,
			book_genres,
			book_author,
		} = req.body;

		const bookObject = {
			id: book_id,
			title: book_title,
			year_release: parseInt(book_year_release),
			image: book_image,
			amazon_link: book_amazon_link,
			resume: book_resume,
			pages: parseInt(book_pages),
			genres: book_genres,
			author: book_author,
		};

		const book = await Books.update(bookObject);

		if (!book) {
			req.flash("warning", `Error: Book not updated!`);
			return res.redirect(`/admin/update/book/${book_id}`);
		}

		req.flash("success", `SUCCESS: Book updated!`);
		return res.redirect(`/admin/update/book/${book.id}`);
	}

	static async postDeleteBook (req: Request, res: Response) {
		const { book_id } = req.params;

		if (await Books.delete(book_id)) {
			req.flash("success", `SUCCESS: Book Deleted!`);
			return res.redirect("/");
		}
		req.flash("warning", `ERROR: Book NOT Deleted!`);
		return res.redirect(`/admin/update/book/${book_id}`);
	}

	/** ******* MOVIE ************** */
	static async getViewCreateMovie (req: Request, res: Response) {
		return res.render("pages/admin/createMovie", {
			user: global.SESSION_USER,
		});
	}

	static async postCreateMovie (req: Request, res: Response) {
		const {
			movie_title,
			movie_year_release,
			movie_image,
			movie_tmdb_link,
			movie_tmdb_rating,
			movie_justwatch_link,
			movie_resume,
			movie_duration,
			movie_genres,
		} = req.body;

		const movieObject = {
			title: movie_title,
			year_release: parseInt(movie_year_release),
			image: movie_image,
			tmdb_link: movie_tmdb_link,
			tmdb_rating: movie_tmdb_rating,
			justwatch_link: movie_justwatch_link,
			resume: movie_resume,
			duration: movie_duration,
			genres: movie_genres,
		};

		const movie = await Movies.create(movieObject);

		if (!movie) {
			req.flash("warning", `Error: Movie not created!`);
			return res.redirect(`/admin/create/movie`);
		}

		req.flash("success", `SUCCESS: Movie created!`);
		return res.redirect(`/admin/update/movie/${movie.id}`);
	}

	static async getViewUpdateMovie (req: Request, res: Response) {
		const { movie_id } = req.params;
		const movie = await Movies.getById(movie_id);

		return res.render("pages/admin/updateMovie", {
			flash_success: req.flash("success"),
			flash_warning: req.flash("warning"),
			movie,
			user: global.SESSION_USER,
		});
	}

	static async postUpdateMovie (req: Request, res: Response) {
		const {
			movie_id,
			movie_title,
			movie_year_release,
			movie_image,
			movie_tmdb_link,
			movie_tmdb_rating,
			movie_justwatch_link,
			movie_resume,
			movie_duration,
			movie_genres,
		} = req.body;

		const movieObject = {
			id: movie_id,
			title: movie_title,
			year_release: parseInt(movie_year_release),
			image: movie_image,
			tmdb_link: movie_tmdb_link,
			tmdb_rating: movie_tmdb_rating,
			justwatch_link: movie_justwatch_link,
			resume: movie_resume,
			duration: movie_duration,
			genres: movie_genres,
		};

		const movie = await Movies.update(movieObject);

		if (!movie) {
			req.flash("warning", `Error: Movie not updated!`);
			return res.redirect(`/admin/update/movie/${movie.id}`);
		}

		req.flash("success", `SUCCESS: Movie updated!`);
		return res.redirect(`/admin/update/movie/${movie.id}`);
	}

	static async postDeleteMovie (req: Request, res: Response) {
		const { book_id } = req.params;

		if (await Movies.delete(book_id)) {
			req.flash("success", `SUCCESS: Movie Deleted!`);
			return res.redirect("/");
		}
		req.flash("warning", `ERROR: Book NOT Deleted!`);
		return res.redirect(`/admin/update/book/${book_id}`);
	}

	/** ******* TV SHOW ************** */
	static async getViewCreateTVShow (req: Request, res: Response) {
		return res.render("pages/admin/createTVShow", {
			user: global.SESSION_USER,
		});
	}

	static async postCreateTVShow (req: Request, res: Response) {
		const {
			tvshow_title,
			tvshow_year_release,
			tvshow_image,
			tvshow_tmdb_link,
			tvshow_tmdb_rating,
			tvshow_justwatch_link,
			tvshow_resume,
			tvshow_duration,
			tvshow_genres,
		} = req.body;

		const tvShowObject = {
			title: tvshow_title,
			year_release: parseInt(tvshow_year_release),
			image: tvshow_image,
			tmdb_link: tvshow_tmdb_link,
			tmdb_rating: tvshow_tmdb_rating,
			justwatch_link: tvshow_justwatch_link,
			resume: tvshow_resume,
			duration: tvshow_duration,
			genres: tvshow_genres,
		};

		const tvshow = await TVShows.create(tvShowObject);

		if (!tvshow) {
			req.flash("warning", `Error: TVShow not updated!`);
			return res.redirect(`/admin/update/tvshow/${tvshow.id}`);
		}

		req.flash("success", `SUCCESS: Movie updated!`);
		return res.redirect(`/admin/update/tvshow/${tvshow.id}`);
	}

	static async getViewUpdateTVShow (req: Request, res: Response) {
		const { tvshow_id } = req.params;
		const tvshow = await TVShows.getById(tvshow_id);

		return res.render("pages/admin/updateTVShow", {
			flash_success: req.flash("success"),
			flash_warning: req.flash("warning"),
			tvshow,
			user: global.SESSION_USER,
		});
	}

	static async postUpdateTVShow (req: Request, res: Response) {
		const {
			tvshow_id,
			tvshow_title,
			tvshow_year_release,
			tvshow_image,
			tvshow_tmdb_link,
			tvshow_tmdb_rating,
			tvshow_justwatch_link,
			tvshow_resume,
			tvshow_duration,
			tvshow_genres,
		} = req.body;

		const tvShowObject = {
			id: tvshow_id,
			title: tvshow_title,
			year_release: parseInt(tvshow_year_release),
			image: tvshow_image,
			tmdb_link: tvshow_tmdb_link,
			tmdb_rating: tvshow_tmdb_rating,
			justwatch_link: tvshow_justwatch_link,
			resume: tvshow_resume,
			duration: tvshow_duration,
			genres: tvshow_genres,
		};

		const tvshow = await TVShows.update(tvShowObject);

		if (!tvshow) {
			req.flash("warning", `Error: Movie not updated!`);
			return res.redirect(`/admin/update/tvshow/${tvshow.id}`);
		}

		req.flash("success", `SUCCESS: Movie updated!`);
		return res.redirect(`/admin/update/tvshow/${tvshow.id}`);
	}

	static async postDeleteTVShow (req: Request, res: Response) {
		const { book_id } = req.params;

		if (await TVShows.delete(book_id)) {
			req.flash("success", `SUCCESS: TVShow Deleted!`);
			return res.redirect("/");
		}
		req.flash("warning", `ERROR: Book NOT Deleted!`);
		return res.redirect(`/admin/update/book/${book_id}`);
	}
}
