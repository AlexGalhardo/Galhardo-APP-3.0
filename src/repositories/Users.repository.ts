import { users as PrismaUser } from "@prisma/client";
import prisma from "../config/prisma";
import Bcrypt from "../utils/Bcrypt";
import { inputSubscriptionTransactionObject, inputUpdateUser, newUserDTO } from "../utils/InputTypes";
import NumberHelper from "../utils/Numbers";
import UserEntity from "../entities/User.entity";

export interface UsersRepositoryPort {
	getUserEntityFromPrismaUser(user: PrismaUser): UserEntity | null
	getAllUsersEntitiesFromPrismaUser(users: PrismaUser[]): UserEntity[] | null
	getAll(): Promise<UserEntity[] | null>
	getTotal(): Promise<number>
	findById(userId: string): Promise<UserEntity | null>
	findByEmail(email: string): Promise<UserEntity | null>
	isAdminById(userId: string): boolean
	isEmailAlreadyRegistred(email: string): Promise<boolean>
	login(email: string, password: string): Promise<UserEntity | null>
	verifyPassword(userId: string, password: string): Promise<boolean>
	emailIsConfirmed(email: string): Promise<boolean>
	update(userObject: inputUpdateUser): Promise<UserEntity | null>
	create(newUser: newUserDTO, confirmEmailToken: string): any
	createStripeCustomer(userId: string, stripe_customer_id: string): any
	createStripeCard(userId: string, customerCard: { card: { id: string; brand: string; exp_month: number; exp_year: number; last4: number } }, cardNumber: string): any
	createStripeSubscription(userId: string, subscriptionTransactionObject: inputSubscriptionTransactionObject): any
	emailExists(email: string): any
	createResetPasswordToken(email: string, resetPasswordToken: string): any
	resetPasswordTokenIsValid(email: string, resetPasswordToken: string): any
	resetPassword(email: string, newPassword: string): any
	verifyIfEmailIsConfirmed(email: string): any
	createConfirmEmailToken(email: string, confirmEmailToken: string): any
	verifyConfirmEmailToken(email: string, confirmEmailToken: string): any
	addGameToShopCart(gameId: string): Promise<boolean>
	addBookToShopCart(book_id: string): Promise<boolean>
	removeShopCartItem(item_id: string): Promise<boolean>
	getTotalItensShopCart(): Promise<number>
	getShopCartItens(): any
	getShopCartTotalAmount(): Promise<number>
	removeAllShopCartItens(): Promise<void>
}

export default class UsersRepository implements UsersRepositoryPort {
	getUserEntityFromPrismaUser(user: PrismaUser): UserEntity | null {
		return user ? new UserEntity(
			user.id,
			user.name,
			user.email,
			user.password,
			user.created_at,
			user.updated_at,
		) : null
	}

	getAllUsersEntitiesFromPrismaUser(users: PrismaUser[]): UserEntity[] | null {
		return users ? users.map(user => new UserEntity(
			user.id,
			user.name,
			user.email,
			user.password,
			user.created_at,
			user.updated_at,
		)) : null
	}

	async getAll(): Promise<UserEntity[] | null> {
		return this.getAllUsersEntitiesFromPrismaUser(await prisma.users.findMany());
	}

	getTotal(): Promise<number> {
		return prisma.users.count();
	}

	async findById(userId: string): Promise<UserEntity | null> {
		return this.getUserEntityFromPrismaUser(
			await prisma.users.findUnique({
				where: {
					id: userId,
				},
			})
		);
	}

	isAdminById(userId: string): any {
		return prisma.users.findUnique({
			where: {
				isAdmin: {
					id: userId,
					admin: true,
				},
			},
		});
	}

	async findByEmail(email: string): Promise<UserEntity | null> {
		const user = await prisma.users.findUnique({
			where: {
				email,
			},
		});

		return this.getUserEntityFromPrismaUser(user)
	}

	async isEmailAlreadyRegistred(email: string): Promise<boolean> {
		return !!await prisma.users.findUnique({
			where: {
				email,
			},
		});
	}

	async login(email: string, password: string): Promise<UserEntity | null> {
		const user = await prisma.users.findUnique({
			where: {
				email,
			},
		});

		if (!user) return null;

		return (await Bcrypt.compare(password, user?.password)) ? this.getUserEntityFromPrismaUser(user) : null;
	}

	async verifyPassword(userId: string, password: string): Promise<boolean> {
		const user = await prisma.users.findUnique({
			where: {
				id: userId,
			},
		});

		return !!(await Bcrypt.compare(password, user?.password as string));
	}

	async emailIsConfirmed(email: string): Promise<boolean> {
		return !!await prisma.users.findUnique({
			where: {
				emailConfirmed: {
					email,
					confirmed_email: true,
				},
			},
		});
	}

	async update(userObject: inputUpdateUser): Promise<UserEntity | null> {
		const User = await prisma.users.findUnique({
			where: {
				id: userObject.id,
			},
		});

		if (User && (await Bcrypt.compare(userObject.older_password, User.password))) {
			await prisma.users.update({
				where: {
					id: User.id,
				},
				data: {
					email: userObject.email ? userObject.email : User.email,
					password: userObject.new_password ? await Bcrypt.hash(userObject.new_password) : User.password,
					phone: userObject.phone ? userObject.phone : User.phone,
					address_zipcode: userObject.address_zipcode,
					address_street: userObject.address_street,
					address_street_number: parseInt(userObject.address_street_number),
					address_neighborhood: userObject.address_neighborhood,
					address_city: userObject.address_city,
					address_state: userObject.address_state,
					address_country: userObject.address_country,
				},
			});
		}

		return this.getUserEntityFromPrismaUser(User);
	}

	async create(newUser: newUserDTO, confirmEmailToken: string) {
		try {
			const queryResponse = await prisma.users.create({
				data: {
					name: newUser.name,
					email: newUser.email,
					password: await Bcrypt.hash(newUser.password),
					confirm_email_token: confirmEmailToken,
				},
			});

			if (queryResponse) {
				return {
					success: true,
					userEntity: newUser,
				};
			}
		} catch (error) {
			return { success: false, error };
		}
	}

	async createStripeCustomer(userId: string, stripe_customer_id: string) {
		await prisma.users.update({
			where: {
				id: userId,
			},
			data: {
				stripe_customer_id,
			},
		});
	}

	async createStripeCard(
		userId: string,
		customerCard: { card: { id: string; brand: string; exp_month: number; exp_year: number; last4: number } },
		cardNumber: string,
	) {
		await prisma.users.update({
			where: {
				id: userId,
			},
			data: {
				stripe_card_id: customerCard.card.id,
				stripe_card_brand: customerCard.card.brand,
				stripe_card_number: cardNumber,
				stripe_card_exp_month: customerCard.card.exp_month,
				stripe_card_exp_year: customerCard.card.exp_year,
				stripe_card_last4: Number(customerCard.card.last4),
			},
		});
	}

	async createStripeSubscription(
		userId: string,
		subscriptionTransactionObject: inputSubscriptionTransactionObject,
	) {
		await prisma.users.update({
			where: {
				id: userId,
			},
			data: {
				stripe_currently_subscription_id: subscriptionTransactionObject.transaction_id,
				stripe_currently_subscription_name: subscriptionTransactionObject.plan_name,
				stripe_subscription_start: subscriptionTransactionObject.current_period_start,
				stripe_subscription_end: subscriptionTransactionObject.current_period_end,
				stripe_cancel_at_period_end: subscriptionTransactionObject.cancel_at_period_end,
			},
		});
	}

	async emailExists(email: string) {
		return prisma.users.findUnique({
			where: {
				email,
			},
		});
	}

	async createResetPasswordToken(email: string, resetPasswordToken: string) {
		await prisma.users.update({
			where: {
				email,
			},
			data: {
				reset_password_token: resetPasswordToken,
			},
		});
	}

	resetPasswordTokenIsValid(email: string, resetPasswordToken: string) {
		return prisma.users.findUnique({
			where: {
				resetPasswordTokenIsValid: {
					email,
					reset_password_token: resetPasswordToken,
				},
			},
		});
	}

	async resetPassword(email: string, newPassword: string) {
		return prisma.users.update({
			where: {
				email,
			},
			data: {
				password: await Bcrypt.hash(newPassword),
				reset_password_token: null,
			},
		});
	}

	verifyIfEmailIsConfirmed(email: string) {
		return prisma.users.findUnique({
			where: {
				emailConfirmed: {
					email,
					confirmed_email: true,
				},
			},
		});
	}

	async createConfirmEmailToken(email: string, confirmEmailToken: string) {
		await prisma.users.update({
			where: {
				email,
			},
			data: {
				confirm_email_token: confirmEmailToken,
			},
		});
	}

	async verifyConfirmEmailToken(email: string, confirmEmailToken: string) {
		if (await this.emailExists(email)) {
			if (
				await prisma.users.findUnique({
					where: {
						confirmEmailTokenIsValid: {
							email,
							confirm_email_token: confirmEmailToken,
						},
					},
				})
			) {
				return prisma.users.update({
					where: {
						email,
					},
					data: {
						confirm_email_token: null,
						confirmed_email: true,
					},
				});
			}
		}
		return false;
	}

	async addGameToShopCart(gameId: string): Promise<boolean> {
		const user = await prisma.users.findUnique({
			where: {
				id: global.SESSION_USER.id,
			},
			select: {
				shop_cart_itens: true,
			},
		});

		const game = await prisma.game.findUnique({
			where: {
				id: gameId,
			},
			select: {
				id: true,
				image: true,
				title: true,
				price: true,
			},
		});

		if (!user) {
			const shopCartItens = [];

			shopCartItens.push(game);

			await prisma.users.update({
				where: {
					id: global.SESSION_USER.id,
				},
				data: {
					shop_cart_itens: JSON.stringify(shopCartItens),
				},
			});

			return true;
		}

		let { shop_cart_itens } = user

		shop_cart_itens = JSON.parse(shop_cart_itens)

		if (shop_cart_itens.some((game) => game.id === gameId)) {
			const indexToRemove = shop_cart_itens?.findIndex(function (game) {
				return game.id === gameId;
			});

			shop_cart_itens.splice(indexToRemove, 1);

			await prisma.users.update({
				where: {
					id: global.SESSION_USER.id,
				},
				data: {
					shop_cart_itens: JSON.stringify(shop_cart_itens),
				},
			});

			return false;
		}

		shop_cart_itens.push(game);

		await prisma.users.update({
			where: {
				id: global.SESSION_USER.id,
			},
			data: {
				shop_cart_itens: JSON.stringify(shop_cart_itens),
			},
		});
		return true;
	}

	async addBookToShopCart(book_id: string): Promise<boolean> {
		let { shop_cart_itens } = await prisma.users.findUnique({
			where: {
				id: global.SESSION_USER.id,
			},
			select: {
				shop_cart_itens: true,
			},
		});

		const book = await prisma.book.findUnique({
			where: {
				id: book_id,
			},
			select: {
				id: true,
				image: true,
				title: true,
				price: true,
			},
		});

		if (!shop_cart_itens) {
			const shopCartItens = [];

			shopCartItens.push(book);

			await prisma.users.update({
				where: {
					id: global.SESSION_USER.id,
				},
				data: {
					shop_cart_itens: JSON.stringify(shopCartItens),
				},
			});

			return true;
		}

		shop_cart_itens = JSON.parse(shop_cart_itens);

		if (shop_cart_itens.some((book) => book.id === book_id)) {
			const indexToRemove = shop_cart_itens.findIndex(function (book) {
				return book.id === book_id;
			});

			shop_cart_itens.splice(indexToRemove, 1);

			await prisma.users.update({
				where: {
					id: global.SESSION_USER.id,
				},
				data: {
					shop_cart_itens: JSON.stringify(shop_cart_itens),
				},
			});

			return false;
		}

		shop_cart_itens.push(book);

		await prisma.users.update({
			where: {
				id: global.SESSION_USER.id,
			},
			data: {
				shop_cart_itens: JSON.stringify(shop_cart_itens),
			},
		});
		return true;
	}

	async removeShopCartItem(item_id: string): Promise<boolean> {
		let { shop_cart_itens } = await prisma.users.findUnique({
			where: {
				id: global.SESSION_USER.id,
			},
			select: {
				shop_cart_itens: true,
			},
		});

		shop_cart_itens = JSON.parse(shop_cart_itens);

		if (shop_cart_itens.some((item) => item.id === item_id)) {
			const indexToRemove = shop_cart_itens.findIndex(function (item) {
				return item.id === item_id;
			});

			shop_cart_itens.splice(indexToRemove, 1);

			await prisma.users.update({
				where: {
					id: global.SESSION_USER.id,
				},
				data: {
					shop_cart_itens: JSON.stringify(shop_cart_itens),
				},
			});

			return true;
		}

		return false;
	}

	async getTotalItensShopCart(): Promise<number> {
		if (global.SESSION_USER) {
			let { shop_cart_itens } = await prisma.users.findUnique({
				where: {
					id: global.SESSION_USER.id,
				},
				select: {
					shop_cart_itens: true,
				},
			});

			shop_cart_itens = JSON.parse(shop_cart_itens);
			return shop_cart_itens?.length || 0;
		}

		return 0;
	}

	async getShopCartItens() {
		if (global.SESSION_USER) {
			let { shop_cart_itens } = await prisma.users.findUnique({
				where: {
					id: global.SESSION_USER.id,
				},
				select: {
					shop_cart_itens: true,
				},
			});

			shop_cart_itens = JSON.parse(shop_cart_itens);
			if (shop_cart_itens && shop_cart_itens.length > 0) {
				shop_cart_itens.forEach(
					(item: { price: string | number }) => (item.price = NumberHelper.toFloat(item.price)),
				);
				return shop_cart_itens;
			}
			return null;
		}
		return null;
	}

	async getShopCartTotalAmount(): Promise<number> {
		if (global.SESSION_USER) {
			let { shop_cart_itens } = await prisma.users.findUnique({
				where: {
					id: global.SESSION_USER.id,
				},
				select: {
					shop_cart_itens: true,
				},
			});

			shop_cart_itens = JSON.parse(shop_cart_itens);

			if (shop_cart_itens && shop_cart_itens.length > 0) {
				const shopCartTotalAmount = shop_cart_itens.reduce((sum: number, { price }) => sum + price, 0);

				return NumberHelper.toFloat(shopCartTotalAmount);
			}

			return 0;
		}
		return 0;
	}

	async removeAllShopCartItens(): Promise<void> {
		await prisma.users.update({
			where: {
				id: global.SESSION_USER.id,
			},
			data: {
				shop_cart_itens: null,
			},
		});
	}
}
