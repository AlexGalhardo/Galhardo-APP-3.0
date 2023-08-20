import csrf from "csurf";
import { Router, Request, Response, NextFunction } from "express";
import { RecaptchaV3 } from "express-recaptcha";

import AppController from "../controllers/Privacy.controller";
import AuthenticationController from "../controllers/Authentication.controller";
import BlogController from "../controllers/Blog.controller";
import BooksController from "../controllers/Books.controller";
import ContactController from "../controllers/Contact.controller";
import GamesController from "../controllers/Games.controller";
import MoviesController from "../controllers/Movies.controller";
import PlansController from "../controllers/Plans.controller";
import ShopController from "../controllers/Shop.controller";
import TVShowsController from "../controllers/TVShows.controller";

const recaptcha = new RecaptchaV3(process.env.RECAPTCHA_ID as string, process.env.RECAPTCHA_SECRET as string, {
	callback: "cb",
});

const csrfProtection = csrf({ cookie: true });
const router = Router();

const userIsAlreadyLoggedIn = (req: Request, res: Response, next: NextFunction) => {
	if (global.SESSION_USER) {
		req.flash("warning", "You need to logout first");
		return res.redirect("/");
	}
	return next();
};

const userIsLoggedIn = (req: Request, res: Response, next: NextFunction) => {
	if (!global.SESSION_USER) {
		req.flash("warning", "You need to login first");
		return res.redirect("/login");
	}
	return next();
};

const userHasActiveSubscription = (req: Request, res: Response, next: NextFunction) => {
	if (global.SESSION_USER.stripe_currently_subscription_name !== "FREE") {
		req.flash(
			"warning",
			`You already have a currently plan ${global.SESSION_USER.stripe_currently_subscription_name} active! Wait until it ends to make a new subscription transaction!`,
		);
		return res.redirect("/plans");
	}
	return next();
};

router
	.get("/", new GamesController().getViewGames)
	.get("/books", BooksController.getViewBooks)
	.get("/movies", MoviesController.getViewMovies)
	.get("/tvshows", TVShowsController.getViewTVShows)

	.get("/contact", recaptcha.middleware.render, csrfProtection, ContactController.getViewContact)
	.post("/contact", recaptcha.middleware.verify, csrfProtection, ContactController.postContact)

	.get("/privacy", AppController.getViewPrivacy)

	.get("/searchGame", new GamesController().getSearchGameTitle)
	.get("/searchBook", BooksController.getSearchBookTitle)
	.get("/searchMovie", MoviesController.getSearchMovieTitle)
	.get("/searchTVShow", TVShowsController.getSearchTVShowTitle)

	.get("/blog", BlogController.getViewBlog)
	.get("/blog/search", BlogController.getSearchBlogTitle)
	.get("/blog/page/:page", BlogController.getViewBlog)

	.get("/blog/:slug", BlogController.getViewBlogPost)

	.get("/shop", userIsLoggedIn, ShopController.getViewShop)
	.post("/shop", userIsLoggedIn, ShopController.postShop)
	.get("/removeCart/:item_id", ShopController.removeCartItem)

	.get("/plans", PlansController.getViewPricing)

	.get(
		"/plan/premium/checkout",
		userIsLoggedIn,
		userHasActiveSubscription,
		PlansController.getViewPlanPremiumCheckout,
	)
	.post("/plan/premium/post", userIsLoggedIn, PlansController.postSubscription)

	.get(
		"/login",
		userIsAlreadyLoggedIn,
        /* recaptcha.middleware.render, */ csrfProtection,
		new AuthenticationController().getViewLogin,
	)
	.post("/login", userIsAlreadyLoggedIn, /* recaptcha.middleware.verify, */ csrfProtection, new AuthenticationController().postLogin)

	.get(
		"/register",
		userIsAlreadyLoggedIn,
		recaptcha.middleware.render,
		csrfProtection,
		new AuthenticationController().getViewRegister,
	)
	.post("/register", userIsAlreadyLoggedIn, recaptcha.middleware.verify, csrfProtection, new AuthenticationController().postRegister)

	.get("/forgetPassword", userIsAlreadyLoggedIn, new AuthenticationController().getViewForgetPassword)
	.post("/forgetPassword", userIsAlreadyLoggedIn, new AuthenticationController().postForgetPassword)

	.get("/confirmEmail/:email/:token", new AuthenticationController().getVerifyIfConfirmEmailURLIsValid)

	.get("/confirmEmail", new AuthenticationController().getViewResendConfirmEmailLink)
	.post("/confirmEmail", new AuthenticationController().postSendConfirmEmailLink)

	.get("/resetPassword/:email/:token", userIsAlreadyLoggedIn, new AuthenticationController().getViewResetPassword)

	.get("/resetPassword/:any", userIsAlreadyLoggedIn, new AuthenticationController().sendToForgetPassword)

	.get("/resetPassword", userIsAlreadyLoggedIn, new AuthenticationController().sendToForgetPassword)

	.post("/resetPassword", userIsAlreadyLoggedIn, new AuthenticationController().postResetPassword);

export default router;
