/* eslint-disable prettier/prettier */
import client, { Connection, Channel } from "amqplib";

import "dotenv/config";
import NodeMailer from "../utils/NodeMailer";
// import TelegramBOTLogger from "../utils/TelegramBOTLogger";
import StripeRepository from "../repositories/Stripe.repository";
import UsersRepository from "../repositories/Users.repository";

class RabbitMQ {
	private connection: Connection | null = null;
	private channel: Channel | null = null;

	constructor() {
		(async () => {
			try {
				this.connection = await client.connect(process.env.RABBITMQ_URL as string);
				this.channel = await this.connection.createChannel();
				await this.channel.assertQueue("shop-transactions-queue");
			} catch (error) {
				console.log(error);
			}
		})();
	}

	public async sendMessage (queue: string, message: string) {
		this.channel?.sendToQueue(queue, Buffer.from(message));
	}

	public async consumeMessage (queue: string) {
		try {
			if (queue === "shop-transactions-queue") {
				this.channel?.consume(queue, async (message: any) => {
					StripeRepository.createShopTransaction(JSON.parse(message.content.toString()));
					NodeMailer.sendShopTransaction(JSON.parse(message.content.toString()));
					// TelegramBOTLogger.logShopTransaction(JSON.parse(message.content.toString()));
					UsersRepository.removeAllShopCartItens();
					this.channel?.ack(message);
				});
			}
		} catch (error) {
			console.log(error);
		}
	}
}

export default new RabbitMQ();
