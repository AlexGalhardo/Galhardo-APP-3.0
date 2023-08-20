import Errors from "src/constants/Errors";

class ZipCode {
    constructor() {
        this.isValid = this.isValid.bind(this);
        this.format = this.format.bind(this);
    }

    public isValid(zipCode: string): boolean {
        const zipDigits = zipCode.replace(/\D/g, "");
        if (zipDigits.length !== 8) return false;
        return true;
    }

    public format(zipCode: string): string {
        const isValid = this.isValid(zipCode);
        if (!isValid) throw new Error(Errors.ZIP_CODE_IS_INVALID);

        const zipDigits = zipCode.replace(/\D/g, "");
        return zipDigits.replace(/(\d{5})(\d{3})/, "$1-$2");
    }

    public sanitize(zipCode: string): string {
        return zipCode.replace(/[^\d]+/g, "");
    }

    public get methods() {
        return {
            isValidZipCode: this.isValid,
            formatZipCode: this.format,
            sanitizeZipCode: this.sanitize,
        };
    }
}

export default ZipCode;
