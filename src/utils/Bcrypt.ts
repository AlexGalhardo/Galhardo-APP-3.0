import bcrypt from "bcryptjs";

export default class Bcrypt {
    static async hash(password: string) {
        const salt = await bcrypt.genSalt(12);
        return await bcrypt.hash(password, salt);
    }

    static async compare(password: string, hashPassword: string) {
        return await bcrypt.compare(password, hashPassword);
    }
}
