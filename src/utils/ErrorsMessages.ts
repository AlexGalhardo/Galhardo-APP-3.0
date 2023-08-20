export enum ErrorsMessages {
	PROCESSING_ERROR = "PROCESSING_ERROR",

	CPF_IS_REQUIRED = "CPF is required",
	CPF_IS_INVALID = "CPF is invalid",

	DOC_NUMBER_IS_REQUIRED = "Document number is required",
	DOC_NUMBER_IS_INVALID = "Document number is invalid",

	USER_ALREADY_EXISTS = "User already exists",
	USER_NOT_FOUND = "User not found",
	USER_CANNOT_AUTHENTICATE = "Cannot authenticate user",

	TOKEN_EXPIRED_OR_INVALID = "Token expired or invalid",

	AUTH_CODE_NOT_FOUND = "Auth code not found",
	AUTH_CODE_IS_REQUIRED = "Code is required",
	AUTH_CODE_IS_INVALID = "Code is invalid",
	AUTH_CODE_EXPIRED = "Auth code expired",

	PASSWORD_IS_INVALID = "Password is invalid",
	PASSWORD_ALREADY_EXISTS = "The user already has a password",
	ZIP_CODE_IS_INVALID = "Zip code is invalid",
	PASSWORD_IS_REQUIRED = "Password is required",
	PHONE_NUMBER_IS_INVALID = "Phone number is invalid",
	EMAIL_IS_INVALID = "Email is invalid",
	NAME_IS_INVALID = "Name is invalid",

	INVALID_RECAPTCHA = "INVALID_RECAPTCHA"
}
