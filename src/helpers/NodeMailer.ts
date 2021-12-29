/**
 * GALHARDO APP | https://galhardoapp.com
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 *
 * ./helpers/NodeMailer.js
 */

import fs from 'fs-extra';
import handlebars from 'handlebars';
import path from 'path';
import randomToken from 'rand-token';

import MailTrap from '../config/smtp';
import Users from '../models/Users';

class NodeMailer {
    async sendContact(contactObject) {
        const filePath = path.join(__dirname, '../views/emails/contact.html');

        const source = fs.readFileSync(filePath, 'utf-8').toString();

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

    async sendShopTransaction(shopTransactionObject) {
        const filePath = path.join(
            __dirname,
            '../views/emails/shop_transaction.html'
        );

        const source = fs.readFileSync(filePath, 'utf-8').toString();

        const template = handlebars.compile(source);

        const replacements = {
            transaction_id: shopTransactionObject.transaction_id,
            payment_method: shopTransactionObject.card_id,
            paid: shopTransactionObject.paid,
            products: JSON.stringify(shopTransactionObject.products),
            total_products: shopTransactionObject.products_amount,
            shipping_fee: shopTransactionObject.shipping_fee,
            amount: shopTransactionObject.total_amount,
            shipping_address_zipcode:
                shopTransactionObject.shipping_address_zipcode,
            shipping_address_street:
                shopTransactionObject.shipping_address_street,
            shipping_address_neighborhood:
                shopTransactionObject.shipping_address_neighborhood,
            shipping_address_city: shopTransactionObject.shipping_address_city,
            shipping_address_state:
                shopTransactionObject.shipping_address_state,
            created_at: shopTransactionObject.created_at,
        };

        const htmlBody = template(replacements);

        await MailTrap.sendMail({
            from: process.env.APP_EMAIL,
            to: 'aleexgvieira@gmail.com', // shopTransactionObject.customer.email,
            subject: `Galhardo APP: Shop Transaction Success!`,
            html: htmlBody,
        });

        MailTrap.close();
    }

    async sendSubscriptionTransaction(subsTransactionObject) {
        const filePath = path.join(
            __dirname,
            '../views/emails/subscription_transaction.html'
        );

        const source = fs.readFileSync(filePath, 'utf-8').toString();

        const template = handlebars.compile(source);

        const replacements = {
            transaction_id: subsTransactionObject.transaction_id,
            status: subsTransactionObject.status,
            plan_name: subsTransactionObject.plan_name,
            amount: parseFloat(subsTransactionObject.plan_amount / 100).toFixed(
                2
            ),
            card_id: subsTransactionObject.card_id,
            card_brand: subsTransactionObject.card_brand,
            card_exp_month: subsTransactionObject.card_exp_month,
            card_exp_year: subsTransactionObject.card_exp_year,
            card_last4: subsTransactionObject.card_last4,
            current_period_start: subsTransactionObject.current_period_start,
            current_period_end: subsTransactionObject.current_period_end,
            created_at: subsTransactionObject.created_at,
        };

        const htmlBody = template(replacements);

        await MailTrap.sendMail({
            from: process.env.APP_EMAIL,
            to: 'aleexgvieira@gmail.com', // subsTransactionObject.customer.email,
            subject: `Galhardo APP: Subscription Transaction Success!`,
            html: htmlBody,
        });

        MailTrap.close();
    }

    async sendConfirmEmailLink(email: string) {
        const confirm_email_token = randomToken.generate(24);

        const confirmEmailLinkURL = `${process.env.APP_URL}/confirmEmail/${email}/${confirm_email_token}`;

        const filePath = path.join(
            __dirname,
            '../views/emails/confirm_email.html'
        );

        const source = fs.readFileSync(filePath, 'utf-8').toString();

        const template = handlebars.compile(source);

        const replacements = {
            confirmEmailLinkURL,
        };

        const htmlBody = template(replacements);

        await Users.createConfirmEmailToken(email, confirm_email_token);
        await MailTrap.sendMail({
            from: process.env.APP_EMAIL,
            to: email,
            subject: `GALHARDO APP: Confirm Your Email!`,
            html: htmlBody,
        });

        MailTrap.close();
    }

    async sendForgetPasswordLink(email: string, reset_password_token: string) {
        const resetPasswordLinkURL = `${process.env.APP_URL}/resetPassword/${email}/${reset_password_token}`;

        const filePath = path.join(
            __dirname,
            '../views/emails/forget_password.html'
        );

        const source = fs.readFileSync(filePath, 'utf-8').toString();

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

export default new NodeMailer();