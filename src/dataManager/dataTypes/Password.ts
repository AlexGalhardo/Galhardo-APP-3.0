class Password {
    constructor() {
        this.isValid = this.isValid.bind(this);
        this.generate = this.generate.bind(this);
    }

    public isValid(password: string, passwordConfirmation: string): boolean {
        if (password !== passwordConfirmation) return false;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

        return regex.test(password);
    }

    public generate(): string {
        return "Ab123*";
    }

    public get methods() {
        return {
            isValidPassword: this.isValid,
            generatePassword: this.generate,
        };
    }
}

export default Password;
