import "dotenv/config";
import bodyParser from "body-parser";
import compression from "compression";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import mustache from "mustache-express";
import path from "path";
import adminRoutes from "./routes/adminRoutes";
import profileRoutes from "./routes/profileRoutes";
import publicRoutes from "./routes/publicRoutes";
import apiRoutes from "./routes/apiRoutes";

import "express-async-errors";

global.SESSION_USER = null;

const app = express();

app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));
app.engine("mustache", mustache())

	.use(cookieParser())
	.use(cors())
	.use(flash())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(express.json())
	.use(compression())
	.use(
		session({
			name: "session",
			secret: `${process.env.SESSION_SECRET}`,
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 3600 * 1000, // 1hr
			},
		}),
	)
	.use(express.static("src/public"))
	.use("/profile", profileRoutes)
	.use("/admin", adminRoutes)
	.use("/api", apiRoutes)
	.use(publicRoutes)
	.use((_, res: Response) => {
		return res.render("pages/404", {
			user: global.SESSION_USER,
		});
	})
	.use((error: Error, req: Request, res: Response, next: NextFunction) => {
		res.status(500);

		if (error.name === "EBADCSRFTOKEN") {
			req.flash("warning", "Inválid CSRF Token!");
			return res.redirect("/");
		}

		console.log("----- ERROR => ", error);
		req.flash("warning", `Something went wrong ERROR => ${error}`);

		return next();
	});

export default app;
