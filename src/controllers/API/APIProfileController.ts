import { Request, Response, NextFunction } from "express";

import Users from "../../repositories/Users.repository";

export default class APIProfileController {
    static async postLogin (req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            return res.json(await Users.login(email, password));
        } catch (err) {
            next(err);
        }
    }

    static async patchProfile (req: Request, res: Response, next: NextFunction) {
        try {
            const {
                name,
                email,
                new_email,
                password,
                new_password,
                document,
                phone,
                birth_date,
                zipcode,
                street,
                street_number,
                neighborhood,
                city,
                state,
                country,
            } = req.body;

            const userObject = {
                name,
                email,
                new_email,
                password,
                new_password,
                document,
                phone,
                birth_date,
                zipcode,
                street,
                street_number,
                neighborhood,
                city,
                state,
                country,
            };

            const user = await Users.update(userObject);

            return user
                ? res.json({ user })
                : res.json({
                    error: "Something went wrong",
                });
        } catch (err) {
            next(err);
        }
    }

    static async deleteProfile (req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const profileDeleted = await Users.delete(email, password);

            if (profileDeleted) {
                return res.json({
                    status: `Profile ${email} deleted!`,
                });
            }

            return res.json({
                status: "Profile NOT deleted! Some error occurred!",
            });
        } catch (err) {
            next(err);
        }
    }
}
