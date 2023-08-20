class Email {
    public isValid(email: string): boolean {
        const regex = /\S+@\S+\.\S+/;

        return regex.test(email);
    }

    public generate(): string {
        return `test.${Math.random().toString().split(".")[1]}@teste.com.br`;
    }

    public get methods() {
        return {
            isValidEmail: this.isValid,
            generateEmail: this.generate,
        };
    }
}

export default Email;
