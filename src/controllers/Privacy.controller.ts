import { Request, Response } from "express";

import Header from "../utils/Header";

export default class AppController {
    static getViewPrivacy(req: Request, res: Response) {
        return res.render("pages.privacy", {
            user: global.SESSION_USER,
            header: Header.privacy(),
        });
    }
}
