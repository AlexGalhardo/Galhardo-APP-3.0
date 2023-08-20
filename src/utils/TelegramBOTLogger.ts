/* eslint-disable no-param-reassign */
// https://api.telegram.org/bot<telegram_token_here>/getUpdates

import https from "https";
import {
    inputContactObject,
    inputShopTransactionObject,
    inputSubscriptionTransactionObject,
} from "src/utils/InputTypes";

import DateTime from "./DateTime";

class TelegramBOTLogger {
    private token: string;
    private channelName: string;
    private baseUrl: string;

    constructor(token: string, channelName: string) {
        this.isThereToken(token);
        this.isThereChannel(channelName);
        this.token = token;
        this.channelName = channelName;
        this.baseUrl = `https://api.telegram.org/bot${token}`;
    }

    isThereToken(token: string) {
        if (!token) throw new Error("There is no Telegram Token in TelegramLogger Class Constructor");
    }

    isThereChannel(channel: string) {
        if (!channel) throw new Error("There is no Telegram Channel name in TelegramLogger Class Constructor");
    }

    emojiMap() {
        return {
            CONTACT: "💬",
            ERROR: "🚨",
            SUBSCRIPTION: "🏆",
            SHOP: "💵",
        };
    }

    sendMessage(level: string, type: string, message: string) {
        const emoji = this.emojiMap()[level];

        const messageToSend = `${emoji} ${type} ${emoji}\n\n <b>CREATED_AT:</b> ${DateTime.getNow()}\n ${message}`;

        const urlParams = encodeURI(`chat_id=${this.channelName}&text=${messageToSend}&parse_mode=HTML`);

        const url = `${this.baseUrl}/sendMessage?${urlParams}`;

        this.sendRequest(url);
    }

    logContact(contactObject: inputContactObject) {
        const emoji = this.emojiMap().CONTACT;

        const log = `
        <b>CONTACT_FROM_NAME:</b> ${contactObject.name}
        <b>CONTACT_FROM_EMAIL:</b> ${contactObject.email}
        <b>SUBJECT:</b> ${contactObject.subject}
        ---------------------------------------
        <b>MESSAGE:</b> ${contactObject.message}
                    `;

        const message = `${emoji} CONTACT ${emoji}\n\n <b>CREATED_AT:</b> ${DateTime.getNow()}\n ${log}`;

        const urlParams = encodeURI(`chat_id=${this.channelName}&text=${message}&parse_mode=HTML`);

        const url = `${this.baseUrl}/sendMessage?${urlParams}`;

        this.sendRequest(url);
    }

    logShopTransaction(shopTransactionObject: inputShopTransactionObject) {
        const emoji = this.emojiMap().SHOP;

        const log = `
        <b>TRANSACTION_ID:</b> ${shopTransactionObject.transaction_id}
        <b>PAID: </b> ${shopTransactionObject.paid}
        <b>AMOUNT: $</b> ${shopTransactionObject.total_amount}
        <b>GATEWAY: </b> Stripe
        <b>PAYMENT_METHOD: </b> ${shopTransactionObject.card_id}
        ---------------------------------------
        <b>CUSTOMER_EMAIL:</b> ${shopTransactionObject.user_email}
        <b>CUSTOMER_ID:</b> ${shopTransactionObject.user_id}
        <b>CUSTOMER_STRIPE_ID:</b> ${shopTransactionObject.stripe_customer_id}
        ---------------------------------------
        <b>PRODUCTS:</b> ${JSON.stringify(shopTransactionObject.products)}
        ---------------------------------------
        <b>SHIPPING_ZIPCODE: </b> ${shopTransactionObject.shipping_address_zipcode}
        <b>SHIPPING_STREET:</b> ${shopTransactionObject.shipping_address_street}
        <b>SHIPPING_NEIGHBORHOOD:</b> ${shopTransactionObject.shipping_address_neighborhood}
        <b>SHIPPING_CITY:</b> ${shopTransactionObject.shipping_address_city}
        <b>SHIPPING_STATE:</b> ${shopTransactionObject.shipping_address_state}
        <b>SHIPPING_COUNTRY:</b> BRAZIL
        `;

        const message = `${emoji} SHOP TRANSACTION ${emoji}\n\n <b>CREATED_AT:</b> ${DateTime.getNow()}\n ${log}`;

        const urlParams = encodeURI(`chat_id=${this.channelName}&text=${message}&parse_mode=HTML`);

        const url = `${this.baseUrl}/sendMessage?${urlParams}`;

        this.sendRequest(url);
    }

    logSubscriptionTransaction(subscriptionTransactionObject: inputSubscriptionTransactionObject) {
        const emoji = this.emojiMap().SUBSCRIPTION;

        const log = `
        <b>TRANSACTION_ID:</b> ${subscriptionTransactionObject.transaction_id}
        <b>STATUS: </b> ${subscriptionTransactionObject.status}
        ---------------------------------------------
        <b>PLAN_NAME:</b> ${subscriptionTransactionObject.plan_name}
        <b>PLAN_AMOUNT:</b> ${subscriptionTransactionObject.plan_amount}
        ---------------------------------------------
        <b>CARD_ID:</b> ${subscriptionTransactionObject.card_id}
        ---------------------------------------------
        <b>CUSTOMER_ID:</b> ${subscriptionTransactionObject.user_id}
        <b>CUSTOMER_STRIPE_ID:</b> ${subscriptionTransactionObject.stripe_customer_id}
        <b>CUSTOMER_EMAIL:</b> ${subscriptionTransactionObject.user_email}
        <b>CUSTOMER_NAME:</b> ${subscriptionTransactionObject.user_name}
        `;

        const message = `${emoji} SUBSCRIPTION TRANSACTION ${emoji}\n\n <b>CREATED_AT:</b> ${DateTime.getNow()}\n ${log}`;

        const urlParams = encodeURI(`chat_id=${this.channelName}&text=${message}&parse_mode=HTML`);

        const url = `${this.baseUrl}/sendMessage?${urlParams}`;

        this.sendRequest(url);
    }

    sendRequest(url: string) {
        return https
            .get(url, (res) => {
                const { statusCode } = res;
                if (statusCode !== 200) {
                    let data: string;
                    res.on("data", (chunk) => {
                        data += chunk;
                    });
                    res.on("end", () => {
                        console.log(data);
                    });
                }
            })
            .on("error", (e) => {
                console.log(e);
            });
    }
}

export default new TelegramBOTLogger(
    process.env.TELEGRAM_BOT_HTTP_TOKEN as string,
    process.env.TELEGRAM_BOT_CHANNEL_ID as string,
);
