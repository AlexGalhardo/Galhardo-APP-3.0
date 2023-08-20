import Data from "src/constants/Data";

class Phone {
    constructor() {
        this.isValid = this.isValid.bind(this);
        this.getStateByPhone = this.getStateByPhone.bind(this);
        this.getStateByDDD = this.getStateByDDD.bind(this);
        this.extractDDD = this.extractDDD.bind(this);
        this.extractNumbers = this.extractNumbers.bind(this);
    }

    public isValid(phone: string): boolean {
        phone = phone.replace(/\D/g, "");

        if (phone.length !== 13) return false;

        if (parseInt(phone.substring(4, 5)) !== 9) return false;

        if (new Set(phone).size === 1) return false;

        if (Data.VALID_DDD.indexOf(parseInt(phone.substring(2, 4))) == -1) return false;

        return true;
    }

    public getStateByPhone(phone: string): string {
        return this.getStateByDDD(this.extractDDD(phone));
    }

    public getStateByDDD(ddd: string): string {
        return Data.STATE_SYMBOL_BY_DDD[ddd];
    }

    public extractNumbers(phone: string): string {
        return phone.replace(/\D/g, "");
    }

    public extractDDD(phone: string): string {
        return this.extractNumbers(phone).substring(0, 2);
    }

    public extractNumber(phone: string): string {
        return this.extractNumbers(phone).substring(2);
    }

    public generate(): string {
        return "5511999999999";
    }

    public get methods() {
        return {
            isValidPhoneNumber: this.isValid,
            getStateByPhone: this.getStateByPhone,
            getStateByPhoneDDD: this.getStateByDDD,
            extractPhoneNumbers: this.extractNumbers,
            extractPhoneDDD: this.extractDDD,
            extractPhoneNumber: this.extractNumber,
            generatePhoneNumber: this.generate,
        };
    }
}

export default Phone;
