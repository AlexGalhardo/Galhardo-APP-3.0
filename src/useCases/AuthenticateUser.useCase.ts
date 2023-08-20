import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UsersRepositoryPort } from "src/repositories/Users.repository";

export interface AuthenticateUserUseCasePort {
	execute(req: Request, res: Response): any
}
export default class AuthenticateUserUseCase implements AuthenticateUserUseCasePort {
	constructor(private readonly usersRepository: UsersRepositoryPort) { }

	async execute(req: Request, res: Response) {
		const errors = validationResult(req);

		if (!req.recaptcha?.error) {
			if (!errors.isEmpty()) {
				req.flash("warning", `${errors.array()[0].msg}`);
				// throw new UseCaseException(`${errors.array()[0].msg}`)
				return res.redirect("/login");
			}
		} else {
			req.flash("warning", `Invalid Recaptcha!`);
			// throw new UseCaseException(ErrorsMessages.INVALID_RECAPTCHA)
			return res.redirect("/login");
		}

		const { email, password } = req.body;

		const user = await this.usersRepository.login(email, password);

		if (user) {
			const confirmedEmail = await this.usersRepository.emailIsConfirmed(email);

			if (!confirmedEmail) {
				req.flash("warning", `You need to confirm your email!`);
				return res.redirect("/login");
			}
		} else {
			req.flash("warning", `Email OR Password Inválid!`);
			return res.redirect("/login");
		}

		global.SESSION_USER = user;
		req.flash("success", `Welcome back, ${user.getName} :D`);
		return res.redirect("/");
	}
}
