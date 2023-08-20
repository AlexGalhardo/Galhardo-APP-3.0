import { Request, Response, NextFunction } from "express";

import { stripe } from "../config/stripe";
import DateTime from "../utils/DateTime";
import Header from "../utils/Header";
import NodeMailer from "../utils/NodeMailer";
// import TelegramBOTLogger from "../utils/TelegramBOTLogger";
import StripeModel from "../repositories/Stripe.repository";
import Users from "../repositories/Users.repository";

export default class PlansController {
	static getViewPricing (req: Request, res: Response) {
		return res.render("pages/plans/plans", {
			flash_warning: req.flash("warning"),
			user: global.SESSION_USER,
			header: Header.plans("Plans - Galhardo APP"),
		});
	}

	static getViewPlanPremiumCheckout (req: Request, res: Response) {
		return res.render("pages/plans/premium_checkout", {
			flash_warning: req.flash("warning"),
			user: global.SESSION_USER,
			header: Header.plans("Plan PREMIUM - Galhardo APP"),
		});
	}

	static async verifyIfUserIsAlreadyAStripeCustomer () {
		if (!global.SESSION_USER.stripe_customer_id) {
			const customer = await stripe.customers.create({
				description: "Customer created in Subscription checkout!",
				email: global.SESSION_USER.email,
			});
			await Users.createStripeCustomer(global.SESSION_USER.id, customer.id);
			return customer.id;
		}
		return global.SESSION_USER.stripe_customer_id;
	}

	static async verifyIfUserAlreadyHasAStripeCardRegistred (req: Request, stripeCustomerId: string) {
		const { card_number, card_exp_year, card_exp_month, card_cvc } = req.body;

		const customerCard = {
			number: card_number,
			exp_month: card_exp_month,
			exp_year: card_exp_year,
			cvc: card_cvc,
		};

		if (!global.SESSION_USER.stripe_card_id) {
			const stripeCardToken = await stripe.tokens.create({
				card: customerCard,
			});

			const cardToken = {
				card: {
					id: stripeCardToken?.id,
					brand: stripeCardToken.card?.brand as string,
					exp_month: stripeCardToken.card?.exp_month as number,
					exp_year: stripeCardToken.card?.exp_year as number,
					last4: Number(stripeCardToken.card?.last4),
				},
			};

			await Users.createStripeCard(global.SESSION_USER.id, cardToken, card_number);

			await stripe.customers.createSource(stripeCustomerId, {
				source: cardToken.card.id,
			});

			return cardToken;
		}

		const cardToken = await stripe.tokens.create({
			card: customerCard,
		});

		await stripe.customers.createSource(stripeCustomerId, {
			source: cardToken.id,
		});

		return cardToken;
	}

	static getStripePlan () {
		return {
			name: "PREMIUM",
			id: process.env.STRIPE_PLAN_PREMIUM_PRICE_ID,
			amount: process.env.STRIPE_PLAN_PREMIUM_AMOUNT,
		};
	}

	static async createStripeSubscription (stripeCustomerId: string, planId: string) {
		const subscription = await stripe.subscriptions.create({
			customer: stripeCustomerId,
			items: [{ price: planId }],
		});

		return subscription;
	}

	static async postSubscription (req: Request, res: Response, next: NextFunction) {
		try {
			const { confirm_password } = req.body;

			if (!(await Users.verifyPassword(global.SESSION_USER.id, confirm_password))) {
				req.flash("warning", "Invalid Password!");
				return res.redirect(`/plan/premium/checkout`);
			}

			const stripeCustomerId = await PlansController.verifyIfUserIsAlreadyAStripeCustomer();

			const stripeCard = await PlansController.verifyIfUserAlreadyHasAStripeCardRegistred(req, stripeCustomerId);

			const stripePlan = PlansController.getStripePlan();

			const subscription = await PlansController.createStripeSubscription(
				stripeCustomerId,
				stripePlan.id as string,
			);

			const subscriptionTransactionObject = {
				transaction_id: subscription.id,
				status: subscription.status,
				card_id: stripeCard?.card?.id as string,
				card_brand: stripeCard?.card?.brand as string,
				card_exp_month: stripeCard?.card?.exp_month as number,
				card_exp_year: stripeCard?.card?.exp_year as number,
				card_last4: Number(stripeCard?.card?.last4),
				plan_id: stripePlan.id as string,
				plan_name: stripePlan.name,
				plan_amount: Number(stripePlan.amount),
				current_period_start: new Date(subscription.current_period_start * 1000),
				current_period_end: new Date(subscription.current_period_end * 1000),
				cancel_at_period_end: subscription.cancel_at_period_end,
				stripe_customer_id: stripeCustomerId,
				user_id: global.SESSION_USER.id,
				user_email: global.SESSION_USER.email,
				user_name: global.SESSION_USER.name,
				created_at: DateTime.getNow(),
			};
			await Users.createStripeSubscription(global.SESSION_USER.id, subscriptionTransactionObject);

			await StripeModel.createSubscriptionTransaction(subscriptionTransactionObject);

			await NodeMailer.sendSubscriptionTransaction(subscriptionTransactionObject);

			// TelegramBOTLogger.logSubscriptionTransaction(subscriptionTransactionObject);

			return res.render("pages/plans/premium_checkout_status", {
				flash_success: "Subscription Created with Success!",
				subscriptionTransactionObject,
				user: global.SESSION_USER,
				header: Header.plans("Premium Subscriptions Successfully!"),
			});
		} catch (error) {
			return next(error);
		}
	}
}
