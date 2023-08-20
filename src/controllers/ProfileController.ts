import { Request, Response } from "express";

import Header from "../utils/Header";
import { inputUpdateUser } from "../utils/InputTypes";
import StripeRepository from "../repositories/Stripe.repository";
import Users from "../repositories/Users.repository";

export default class ProfileController {
	static async getViewProfile (req: Request, res: Response) {
		return res.render("pages/profile/profile", {
			user: global.SESSION_USER,
			flash_success: req.flash("success"),
			flash_warning: req.flash("warning"),
			header: Header.profile("My Profile - Galhardo APP"),
		});
	}

	static logout (req: Request, res: Response) {
		req.session.destroy((error) => {
			if (error) throw new Error(error);
		});
		global.SESSION_USER = null;
		return res.redirect("/login");
	}

	static async updateProfile (req: Request, res: Response) {
		const {
			username,
			email,
			document,
			phone,
			birth_date,
			older_password,
			new_password,
			zipcode,
			street,
			street_number,
			neighborhood,
			state,
			city,
			country,
		} = req.body;

		const userObject: inputUpdateUser = {
			id: global.SESSION_USER.id,
			username,
			email,
			document,
			phone,
			birth_date,
			older_password,
			new_password,
			address_zipcode: zipcode,
			address_street: street,
			address_street_number: street_number,
			address_neighborhood: neighborhood,
			address_state: state,
			address_city: city,
			address_country: country,
		};

		if (await Users.update(userObject)) {
			req.flash("success", "Profile Information Updated!");
			return res.redirect("/profile");
		}

		req.flash("warning", "Something went wrong");
		return res.redirect("/profile");
	}

	static async getViewMyShopTransactions (req: Request, res: Response) {
		const shopTransactions = await StripeRepository.getShopTransactionsByUserId(global.SESSION_USER.id);

		return res.render("pages/profile/my_shop_transactions", {
			user: global.SESSION_USER,
			shopTransactions,
			header: Header.profile("My Shop Transactions - Galhardo APP"),
		});
	}

	static async getViewShopTransactionByID (req: Request, res: Response) {
		const { shop_transaction_id } = req.params;

		const shopTransaction = await StripeRepository.getShopTransactionById(shop_transaction_id);

		shopTransaction!.products = JSON.parse(shopTransaction!.products);

		return res.render("pages/profile/shop_transaction", {
			user: global.SESSION_USER,
			shopTransaction,
			header: Header.profile("Shop Transaction - Galhardo APP"),
		});
	}

	static async getViewMySubscriptionsTransactions (req: Request, res: Response) {
		const subsTransactions = await StripeRepository.getSubscriptionsTransactionsByUserId(global.SESSION_USER.id);

		return res.render("pages/profile/my_subs_transactions", {
			user: global.SESSION_USER,
			subsTransactions,
			header: Header.profile("My Subscriptions Transactions - Galhardo APP"),
		});
	}

	static async getViewSubscriptionTransactionByID (req: Request, res: Response) {
		const { subs_transaction_id } = req.params;

		const subsTransaction = await StripeRepository.getSubscriptionTransactionById(subs_transaction_id);

		return res.render("pages/profile/sub_transaction", {
			user: global.SESSION_USER,
			subsTransaction,
			header: Header.profile("Subs Transaction - Galhardo APP"),
		});
	}

	static async deleteStripeCard (req: Request, res: Response) {
		const { stripe_card_id } = req.params;

		await StripeRepository.deleteStripeCard(global.SESSION_USER.id, stripe_card_id);

		req.flash("success", "Stripe Card Deleted!");
		return res.redirect("/profile");
	}

	static async cancelStripeSubscriptionRenewAtPeriodEnd (req: Request, res: Response) {
		const { stripe_currently_subscription_id } = req.params;

		await StripeRepository.cancelStripeSubscriptionRenewAtPeriodEnd(
			global.SESSION_USER.id,
			stripe_currently_subscription_id,
		);

		req.flash("success", "Canceled Subscription Renew At Period End!");
		return res.redirect("/profile");
	}
}
