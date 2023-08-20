import { Router, Request, Response, NextFunction } from "express";

import ProfileController from "../controllers/Profile.controller";

const router = Router();

const userIsLoggedIn = (req: Request, res: Response, next: NextFunction) => {
	if (!req.session.id) {
		req.flash("warning", "You need to login first");
		return res.redirect("/login");
	}
	next();
};

export default router
	.get("/", userIsLoggedIn, ProfileController.getViewProfile)

	.post("/", userIsLoggedIn, ProfileController.updateProfile)

	.get("/shop/transactions", userIsLoggedIn, ProfileController.getViewMyShopTransactions)

	.get("/shop/transaction/:shop_transaction_id", userIsLoggedIn, ProfileController.getViewShopTransactionByID)

	.get("/subscriptions/transactions", userIsLoggedIn, ProfileController.getViewMySubscriptionsTransactions)

	.get(
		"/subscription/transaction/:subs_transaction_id",
		userIsLoggedIn,
		ProfileController.getViewSubscriptionTransactionByID,
	)

	.get("/logout", userIsLoggedIn, ProfileController.logout)

	.get("/delete/stripeCard/:stripe_card_id", userIsLoggedIn, ProfileController.deleteStripeCard)

	.get(
		"/cancel/subscription/:stripe_currently_subscription_id",
		userIsLoggedIn,
		ProfileController.cancelStripeSubscriptionRenewAtPeriodEnd,
	);
