import { randomBytes } from "crypto";

class Strings {
    public isLengthBetween(value: string, min: number, max: number): boolean {
        return value.length > min && value.length < max;
    }

    public isLengthBetweenOrEqual(value: string, min: number, max: number): boolean {
        return value.length >= min && value.length <= max;
    }

    public isLengthGreaterThan(value: string, min: number): boolean {
        return value.length > min;
    }

    public isLengthGreaterThanOrEqual(value: string, min: number): boolean {
        return value.length >= min;
    }

    public isLengthLessThan(value: string, max: number): boolean {
        return value.length < max;
    }

    public isLengthLessThanOrEqual(value: string, max: number): boolean {
        return value.length <= max;
    }

    public isLengthEqual(value: string, length: number): boolean {
        return value.length === length;
    }

    public isLengthNotEqual(value: string, length: number): boolean {
        return value.length !== length;
    }

    // Cria um alfanumérico de 32 caracteres com letras apenas minúsculas
    public generateAlphaNumeric(length = 16) {
        return randomBytes(Math.ceil(length / 2))
            .toString("hex")
            .slice(0, length);
    }

    public get methods() {
        return {
            isStringLenghtBetween: this.isLengthBetween,
            isStringLenghtBetweenOrEqual: this.isLengthBetweenOrEqual,
            isStringLenghtGreaterThan: this.isLengthGreaterThan,
            isStringLenghtGreaterThanOrEqual: this.isLengthGreaterThanOrEqual,
            isStringLenghtLessThan: this.isLengthLessThan,
            isStringLenghtLessThanOrEqual: this.isLengthLessThanOrEqual,
            isStringLenghtEqual: this.isLengthEqual,
            isStringLenghtNotEqual: this.isLengthNotEqual,
            generateAlphaNumeric: this.generateAlphaNumeric,
        };
    }
}

export default Strings;
