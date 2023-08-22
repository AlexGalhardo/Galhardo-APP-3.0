import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import Header from "../utils/Header";
import NodeMailer from "../utils/NodeMailer";
// import TelegramBOTLogger from "../utils/TelegramBOTLogger";

export default class ContactController {
    static getViewContact(req: Request, res: Response) {
        res.render("pages.contact", {
            flash_success: req.flash("success"),
            flash_warning: req.flash("warning"),
            user: global.SESSION_USER,
            header: Header.contact(),
            captcha: res.recaptcha,
            csrfToken: req.csrfToken(),
        });
    }

    static async postContact(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);

            if (!req.recaptcha?.error) {
                if (!errors.isEmpty()) {
                    req.flash("warning", `${errors.array()[0].msg}`);
                    return res.redirect("/contact");
                }
            } else {
                req.flash("warning", `Invalid Recaptcha!`);
                return res.redirect("/contact");
            }

            const { name, email, subject, message } = req.body;

            const contactObject = {
                name,
                email,
                subject,
                message,
            };

            await NodeMailer.sendContact(contactObject);
            // await TelegramBOTLogger.logContact(contactObject);

            req.flash("success", "Message Send!");
            return res.redirect("/contact");
        } catch (error) {
            next(error);
        }
    }
}
