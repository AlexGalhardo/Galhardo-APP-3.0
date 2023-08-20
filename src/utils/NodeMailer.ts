import fs from "fs-extra";
import handlebars from "handlebars";
import path from "path";

import MailTrap from "../config/smtp";
import Users from "../repositories/Users.repository";
import { inputShopTransactionObject, inputSubscriptionTransactionObject, inputContactObject } from "./InputTypes";

export default class NodeMailer {
    static async sendContact (contactObject: inputContactObject) {
        const filePath = path.join(__dirname, "../views/emails/contact.html");

        const source = fs.readFileSync(filePath, "utf-8").toString();

        const template = handlebars.compile(source);

        const replacements = {
            name: contactObject.name,
            email: contactObject.email,
            subject: contactObject.subject,
            message: contactObject.message,
        };

        const htmlBody = template(replacements);

        await MailTrap.sendMail({
            from: contactObject.email,
            to: process.env.APP_EMAIL,
            subject: `Galhardo APP Contact: ${contactObject.subject} from ${contactObject.name}`,
            text: contactObject.subject,
            html: htmlBody,
        });

        MailTrap.close();
    }

    static async sendShopTransaction (shopTransactionObject: inputShopTransactionObject) {
        const filePath = path.join(__dirname, "../views/emails/shop_transaction.html");

        const source = fs.readFileSync(filePath, "utf-8").toString();

        const template = handlebars.compile(source);

        const replacements = {
            transaction_id: shopTransactionObject.transaction_id,
            payment_method: shopTransactionObject.card_id,
            paid: shopTransactionObject.paid,
            products: JSON.stringify(shopTransactionObject.products),
            total_products: shopTransactionObject.products_amount,
            shipping_fee: shopTransactionObject.shipping_fee,
            amount: shopTransactionObject.total_amount,
            shipping_address_zipcode: shopTransactionObject.shipping_address_zipcode,
            shipping_address_street: shopTransactionObject.shipping_address_street,
            shipping_address_neighborhood: shopTransactionObject.shipping_address_neighborhood,
            shipping_address_city: shopTransactionObject.shipping_address_city,
            shipping_address_state: shopTransactionObject.shipping_address_state,
            created_at: new Date(),
        };

        const htmlBody = template(replacements);

        await MailTrap.sendMail({
            from: process.env.APP_EMAIL,
            to: "aleexgvieira@gmail.com", // shopTransactionObject.customer.email,
            subject: `Galhardo APP: Shop Transaction Success!`,
            html: htmlBody,
        });

        MailTrap.close();
    }

    static async sendSubscriptionTransaction (subsTransactionObject: inputSubscriptionTransactionObject) {
        const filePath = path.join(__dirname, "../views/emails/subscription_transaction.html");

        const source = fs.readFileSync(filePath, "utf-8").toString();

        const template = handlebars.compile(source);

        const replacements = {
            transaction_id: subsTransactionObject.transaction_id,
            status: subsTransactionObject.status,
            plan_name: subsTransactionObject.plan_name,
            amount: Number(subsTransactionObject.plan_amount / 100).toFixed(2),
            card_id: subsTransactionObject.card_id,
            card_brand: subsTransactionObject.card_brand,
            card_exp_month: subsTransactionObject.card_exp_month,
            card_exp_year: subsTransactionObject.card_exp_year,
            card_last4: subsTransactionObject.card_last4,
            current_period_start: subsTransactionObject.current_period_start,
            current_period_end: subsTransactionObject.current_period_end,
            created_at: new Date(),
        };

        const htmlBody = template(replacements);

        await MailTrap.sendMail({
            from: process.env.APP_EMAIL,
            to: "aleexgvieira@gmail.com", // subsTransactionObject.customer.email,
            subject: `Galhardo APP: Subscription Transaction Success!`,
            html: htmlBody,
        });

        MailTrap.close();
    }

    static async sendConfirmEmailLink (email: string, confirmEmailToken: string) {
        const confirmEmailLinkURL = `${process.env.APP_URL}/confirmEmail/${email}/${confirmEmailToken}`;

        const filePath = path.join(__dirname, "../views/emails/confirm_email.html");

        const source = fs.readFileSync(filePath, "utf-8").toString();

        const template = handlebars.compile(source);

        const replacements = {
            confirmEmailLinkURL,
        };

        const htmlBody = template(replacements);

        await Users.createConfirmEmailToken(email, confirmEmailToken);

        await MailTrap.sendMail({
            from: process.env.APP_EMAIL,
            to: email,
            subject: `GALHARDO APP: Confirm Your Email!`,
            html: htmlBody,
        });

        MailTrap.close();
    }

    static async sendForgetPasswordLink (email: string, resetPasswordToken: string) {
        const resetPasswordLinkURL = `${process.env.APP_URL}/resetPassword/${email}/${resetPasswordToken}`;

        const filePath = path.join(__dirname, "../views/emails/forget_password.html");

        const source = fs.readFileSync(filePath, "utf-8").toString();

        const template = handlebars.compile(source);

        const replacements = {
            resetPasswordLinkURL,
        };

        const htmlBody = template(replacements);

        await MailTrap.sendMail({
            from: process.env.APP_EMAIL,
            to: email,
            subject: `GALHARDO APP: Recover Your Password!`,
            html: htmlBody,
        });

        MailTrap.close();
    }
}
