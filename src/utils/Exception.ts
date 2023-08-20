export abstract class RequestException extends Error {
	private readonly HTTP_STATUS_CODE: number = 500
	constructor(message: string, httpStatusCode: number) {
		super(message)
		this.HTTP_STATUS_CODE = httpStatusCode
		this.name = 'RequestException'
	}

	get httpStatusCode(): number {
		return this.HTTP_STATUS_CODE
	}
}

export class UseCaseException extends RequestException {
	constructor(message: string) {
		super(message, 400)
		this.name = 'ClientException'
	}
}

export class ClientNotFoundException extends RequestException {
	constructor(message: string) {
		super(message, 404)
		this.name = 'ClientNotFoundException'
	}
}

export class UnauthorizedException extends RequestException {
	constructor(message: string) {
		super(message, 401)
		this.name = 'UnauthorizedException'
	}
}

export class ForbiddenException extends RequestException {
	constructor(message: string) {
		super(message, 403)
		this.name = 'ForbiddenException'
	}
}

export class ServerException extends RequestException {
	constructor(message: string) {
		super(message, 500)
		this.name = 'ServerException'
	}
}
