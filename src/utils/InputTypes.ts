export type newUserDTO = {
	name: string;
	email: string;
	password: string;
};

export type inputUpdateUser = {
	id: string;
	username: string;
	email: string;
	older_password: string;
	new_password: string;
	document: string;
	phone: string;
	birth_date: string;
	address_zipcode: string;
	address_street: string;
	address_street_number: string;
	address_neighborhood: string;
	address_city: string;
	address_state: string;
	address_country: string;
};

export type inputBookObject = {
	id: string;
	title: string;
	year_release: number;
	price: number;
	image: string;
	genres: string;
	pages: string;
	author: string;
	amazon_link: string;
	resume: string;
	updated_at: string;
};

export interface createBlogDTO {
	title: string;
	image: string;
	category: string;
	resume: string;
	body: string;
}

export interface updateBlogDTO {
	id: string;
	title: string;
	image: string;
	category: string;
	resume: string;
	body: string;
}

export type inputGameObject = {
	id: string;
	title: string;
	price: number;
	year_release: number;
	platforms: string;
	genres: string;
	developer: string;
	image: string;
	igdb_link: string;
	igdb_rating: number;
	amazon_link: string;
	resume: string;
};

export type inputMovieObject = {
	id: string;
	title: string;
	year_release: number;
	image: string;
	tmdb_link: string;
	tmdb_rating: string;
	justwatch_link: string;
	resume: string;
	duration: string;
	genres: string;
};

export type inputTvShowObject = {
	id: string;
	title: string;
	year_release: number;
	image: string;
	tmdb_link: string;
	tmdb_rating: string;
	justwatch_link: string;
	resume: string;
	duration: string;
	genres: string;
};

export type inputContactObject = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

export type inputShopTransactionObject = {
	transaction_id: string;
	total_amount: number;
	card_id: string;
	card_brand: string;
	card_exp_month: number;
	card_exp_year: number;
	card_last4: number;
	currency: string;
	paid: boolean;
	products_amount: number;
	products: string;
	stripe_customer_id: string;
	user_id: string;
	user_email: string;
	user_phone: string;
	user_name: string;
	shipping_address_zipcode: string;
	shipping_address_street: string;
	shipping_address_street_number: number;
	shipping_address_neighborhood: string;
	shipping_address_city: string;
	shipping_address_state: string;
	shipping_address_country: string;
	shipping_carrier: string;
	shipping_fee: number;
};

export type inputSubscriptionTransactionObject = {
	transaction_id: string;
	status: string;
	card_id: string;
	card_brand: string;
	card_exp_month: number;
	card_exp_year: number;
	card_last4: number;
	plan_id: string;
	plan_name: string;
	plan_amount: number;
	current_period_start: Date;
	current_period_end: Date;
	cancel_at_period_end: boolean;
	stripe_customer_id: string;
	user_id: string;
	user_email: string;
	user_name: string;
	created_at: string;
};
