import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import randomToken from "rand-token";
import NodeMailer from "../utils/NodeMailer";
import UsersRepository from "../repositories/Users.repository";
import AuthenticateUserUseCase, { AuthenticateUserUseCasePort } from "../useCases/AuthenticateUser.useCase";

export default class AuthenticationController {
	// private readonly authenticateUserUseCase: AuthenticateUserUseCasePort = new AuthenticateUserUseCase(new UsersRepository())

	getViewLogin(req: Request, res: Response) {
		return res.render("pages/auth/login", {
			flash_success: req.flash("success"),
			flash_warning: req.flash("warning"),
			captcha: res.recaptcha,
			csrfToken: req.csrfToken(),
		});
	}

	async postLogin(req: Request, res: Response, next: NextFunction) {
		try {
			await new AuthenticateUserUseCase(new UsersRepository()).execute(req, res)
		} catch (exception) {
			return next(exception);
		}
	}

	getViewRegister(req: Request, res: Response) {
		const { username, email, github_id, github_avatar, google_id, google_avatar, facebook_id, facebook_avatar } =
			req.query;

		let email_readonly = null;
		if (email) email_readonly = true;

		return res.render("pages/auth/register", {
			flash_success: req.flash("success"),
			flash_warning: req.flash("warning"),
			username,
			email,
			email_readonly,
			github_id,
			github_avatar,
			facebook_id,
			facebook_avatar,
			google_id,
			google_avatar,
			csrfToken: req.csrfToken(),
			captcha: res.recaptcha,
			app_url: process.env.APP_URL,
		});
	}

	async postRegister(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req);

			if (!req.recaptcha?.error) {
				if (!errors.isEmpty()) {
					req.flash("warning", errors.array()[0].msg);
					return res.redirect("/register");
				}
			} else {
				req.flash("warning", "Invalid Recaptcha!");
				return res.redirect("/register");
			}

			const {
				username,
				email,
				password,
				confirm_password,
				github_id,
				github_avatar,
				facebook_id,
				facebook_avatar,
				google_id,
				google_avatar,
			} = req.body;

			const confirmEmailToken = randomToken.generate(24);

			const userObject = {
				username,
				email,
				password,
				confirm_password,
				github_id,
				github_avatar,
				facebook_id,
				facebook_avatar,
				google_id,
				google_avatar,
				confirmEmailToken,
			};

			await Users.create(userObject, confirmEmailToken);
			await NodeMailer.sendConfirmEmailLink(email, confirmEmailToken);

			req.flash("success", "Account Created! Confirm your email by clicking the link send to your email inbox!");
			return res.redirect("/login");
		} catch (error) {
			return next(error);
		}
	}

	getViewForgetPassword(req: Request, res: Response) {
		return res.render("pages/auth/forgetPassword", {
			flash_success: req.flash("success"),
			flash_warning: req.flash("warning"),
		});
	}

	async postForgetPassword(req: Request, res: Response) {
		const { email } = req.body;

		const resetPasswordToken = randomToken.generate(24);

		if (await Users.emailExists(email)) {
			await Users.createResetPasswordToken(email, resetPasswordToken);
			await NodeMailer.sendForgetPasswordLink(email, resetPasswordToken);
		}

		req.flash("success", `If this email exists, we'll send a link to this email to recover password!`);
		return res.redirect("/forgetPassword");
	}

	sendToForgetPassword(res: Response) {
		return res.redirect("/forgetPassword");
	}

	async getViewResetPassword(req: Request, res: Response) {
		const { email, token } = req.params;

		if (!email || !token) {
			return res.redirect("/forgetPassword");
		}

		if (!(await Users.resetPasswordTokenIsValid(email, token))) {
			return res.redirect("/forgetPassword");
		}

		return res.render("pages/auth/resetPassword", {
			email,
			flash_success: req.flash("success"),
			flash_warning: req.flash("warning"),
		});
	}

	async postResetPassword(req: Request, res: Response) {
		const { email, new_password } = req.body;

		if (!(await Users.resetPassword(email, new_password))) {
			return res.redirect("/forgetPassword");
		}

		req.flash("success", "Password updated successfull!");
		return res.redirect("/login");
	}

	getViewResendConfirmEmailLink(req: Request, res: Response) {
		return res.render("pages/auth/confirmEmail", {
			flash_success: req.flash("success"),
		});
	}

	async postSendConfirmEmailLink(req: Request, res: Response) {
		const { email } = req.body;

		const confirmEmailToken = randomToken.generate(24);

		if (!(await Users.verifyIfEmailIsConfirmed(email))) {
			await NodeMailer.sendConfirmEmailLink(email, confirmEmailToken);
		}

		req.flash(
			"success",
			"If this email is registred and not confirmed yet, we'll send a link to confirm this email!",
		);
		return res.redirect("/confirmEmail");
	}

	async getVerifyIfConfirmEmailURLIsValid(req: Request, res: Response) {
		const { email, token } = req.params;

		if (await Users.verifyConfirmEmailToken(email, token)) {
			req.flash("success", "Email confirmed!");
			return res.redirect("/login");
		}

		return res.redirect("/login");
	}
}
