export default class DateTime {
	static getDateTime(timestamp: number) {
		const date = new Date(timestamp * 1000).toLocaleDateString(process.env.LOCALE_DATE_TIME);
		const time = new Date(timestamp * 1000).toLocaleTimeString(process.env.LOCALE_DATE_TIME);
		return `${date} ${time}`;
	}

	static get getNow() {
		const date = new Date().toLocaleDateString(process.env.LOCALE_DATE_TIME);
		const time = new Date().toLocaleTimeString(process.env.LOCALE_DATE_TIME);
		return `${date} ${time}`;
	}
}
