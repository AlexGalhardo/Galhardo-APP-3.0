/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import Bcrypt from "../../utils/Bcrypt";
import DateTime from "../../utils/DateTime";
import Users from "../../repositories/Users.repository";

export default class APIAdminController {
	static async postAdminLogin (req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			const { email, password } = req.body;

			if (!Users.emailRegistred(email)) {
				return res.status(422).json({
					error: "Email inválid!",
				});
			}

			const user = await Users.getUserByEmail(email);

			const passwordIsValid = await Bcrypt.compare(password, user?.password as string);

			if (!passwordIsValid) {
				return res.status(422).json({
					error: "Incorrect password",
				});
			}

			if (!user?.admin) {
				return res.status(422).json({
					error: "This user is NOT ADMIN!",
				});
			}

			const JWT_TOKEN = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

			return res.json({
				jwt_token: JWT_TOKEN,
			});
		} catch (err) {
			return next(err);
		}
	}

	static async postAdminTestJWT (req: Request, res: Response, next: NextFunction) {
		try {
			const JWT_TOKEN = req.headers.authorization?.split(" ")[1];

			const decoded = jwt.verify(JWT_TOKEN as string, process.env.JWT_SECRET as string);

			const admin = await Users.getById(decoded.user_id);

			return res.json({
				admin: {
					name: admin?.name,
					email: admin?.email,
					JWT_created_at: DateTime.getDateTime(decoded.iat),
					JWT_expires_at: DateTime.getDateTime(decoded.exp),
				},
			});
		} catch (err) {
			return next(err);
		}
	}

	static async verifyAdminAPIRequestUsingJWT (req: Request, res: Response) {
		if (
			!req.headers.authorization ||
			!req.headers.authorization.startsWith("Bearer") ||
			!req.headers.authorization.split(" ")[1]
		) {
			return res.status(422).json({
				message: "Please provide the ADMIN JWT Token in Header Authorization Bearer Token",
			});
		}

		const JWT_TOKEN = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(JWT_TOKEN, process.env.JWT_SECRET as string);

		const user = await Users.getById(decoded.user_id);

		return user?.admin
			? user
			: res.status(422).json({
				error: "This JWT Token is Inválid!",
			});
	}

	static async getUsersRegistred (req: Request, res: Response) {
		return res.json(await Users.getAll());
	}
}
