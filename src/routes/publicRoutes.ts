import csrf from "csurf";
import dotenv from "dotenv";
import { Router, Request, Response, NextFunction } from "express";
import { RecaptchaV3 } from "express-recaptcha";

import AppController from "../controllers/AppController";
import AuthController from "../controllers/AuthController";
import BlogController from "../controllers/BlogController";
import BooksController from "../controllers/BooksController";
import ContactController from "../controllers/ContactController";
import GamesController from "../controllers/GamesController";
import MoviesController from "../controllers/MoviesController";
import PlansController from "../controllers/PlansController";
import ShopController from "../controllers/ShopController";
import TVShowsController from "../controllers/TVShowsController";

const recaptcha = new RecaptchaV3(process.env.RECAPTCHA_ID, process.env.RECAPTCHA_SECRET, { callback: "cb" });

dotenv.config();

const csrfProtection = csrf({ cookie: true });
const router = Router();

const userIsAlreadyLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.userID) {
        req.flash("warning", "You need to logout first");
        return res.redirect("/");
    }
    return next();
};

const userIsNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userID) {
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
    .get("/", GamesController.getViewGames)
    .get("/books", BooksController.getViewBooks)
    .get("/movies", MoviesController.getViewMovies)
    .get("/tvshows", TVShowsController.getViewTVShows)

    .get("/contact", recaptcha.middleware.render, csrfProtection, ContactController.getViewContact)
    .post("/contact", recaptcha.middleware.verify, csrfProtection, ContactController.postContact)

    .get("/privacy", AppController.getViewPrivacy)

    .get("/searchGame", GamesController.getSearchGameTitle)
    .get("/searchBook", BooksController.getSearchBookTitle)
    .get("/searchMovie", MoviesController.getSearchMovieTitle)
    .get("/searchTVShow", TVShowsController.getSearchTVShowTitle)

    .get("/blog", BlogController.getViewBlog)
    .get("/blog/search", BlogController.getSearchBlogTitle)
    .get("/blog/page/:page", BlogController.getViewBlog)

    .get("/blog/:slug", BlogController.getViewBlogPost)

    .get("/newsletter-confirm-email", (req, res) => {
        req.flash("success", "Confirm your newsletter subscription by clicking in the link send to your email inbox!");
        return res.redirect("/");
    })
    .get("/newsletter-email-confirmed", (req, res) => {
        req.flash("success", "Your newsletter subscription was confirmed! Welcome aboard :D");
        return res.redirect("/");
    })

    .get("/shop", userIsNotLoggedIn, ShopController.getViewShop)
    .post("/shop", userIsNotLoggedIn, ShopController.postShopPayLog)
    .get("/removeCart/:item_id", ShopController.removeCartItem)

    .get("/pricing", PlansController.getViewPricing)

    .get("/plan/pro/checkout", userIsNotLoggedIn, userHasActiveSubscription, PlansController.getViewPlanProCheckout)
    .post("/plan/pro/checkout", userIsNotLoggedIn, PlansController.postSubscription)

    .get(
        "/plan/premium/checkout",
        userIsNotLoggedIn,
        userHasActiveSubscription,
        PlansController.getViewPlanPremiumCheckout,
    )
    .post("/plan/premium/checkout", userIsNotLoggedIn, PlansController.postSubscription)

    .get("/login", userIsAlreadyLoggedIn, recaptcha.middleware.render, csrfProtection, AuthController.getViewLogin)
    .post("/login", userIsAlreadyLoggedIn, recaptcha.middleware.verify, csrfProtection, AuthController.postLogin)

    .get(
        "/register",
        userIsAlreadyLoggedIn,
        recaptcha.middleware.render,
        csrfProtection,
        AuthController.getViewRegister,
    )
    .post("/register", userIsAlreadyLoggedIn, recaptcha.middleware.verify, csrfProtection, AuthController.postRegister)

    .get("/forgetPassword", userIsAlreadyLoggedIn, AuthController.getViewForgetPassword)
    .post("/forgetPassword", userIsAlreadyLoggedIn, AuthController.postForgetPassword)

    .get("/confirmEmail/:email/:token", AuthController.getVerifyIfConfirmEmailURLIsValid)

    .get("/confirmEmail", AuthController.getViewResendConfirmEmailLink)
    .post("/confirmEmail", AuthController.postSendConfirmEmailLink)

    .get("/resetPassword/:email/:token", userIsAlreadyLoggedIn, AuthController.getViewResetPassword)

    .get("/resetPassword/:any", userIsAlreadyLoggedIn, AuthController.sendToForgetPassword)

    .get("/resetPassword", userIsAlreadyLoggedIn, AuthController.sendToForgetPassword)

    .post("/resetPassword", userIsAlreadyLoggedIn, AuthController.postResetPassword);

export default router;
