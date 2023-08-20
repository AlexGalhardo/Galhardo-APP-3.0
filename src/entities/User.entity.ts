import "dotenv/config";
import Bcrypt from "../utils/Bcrypt";
import DateTime from "../utils/DateTime";

export default class UserEntity {
	constructor(
		private readonly id: string,
		private name: string,
		private email: string,
		private password: string,
		private readonly createdAt?: Date | null,
		private updatedAt?: Date | null
	) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}

	static async init(id: string, name: string, email: string, password: string) {
		const hashPassword = await Bcrypt.hash(password);
		return new UserEntity(id, name, email, hashPassword);
	}

	get getId(): string {
		return this.id;
	}

	get getName(): string {
		return this.name;
	}

	get getEmail(): string {
		return this.email;
	}

	get getPassword(): string {
		return this.password;
	}

	public setName(newName: string): void {
		this.name = newName;
	}

	public setEmail(newEmail: string): void {
		this.email = newEmail;
	}

	public async setPassword(newPassword: string): Promise<void> {
		this.password = await Bcrypt.hash(newPassword);
	}

	public setUpdatedAt(): void {
		this.updatedAt = new Date();
	}
}
