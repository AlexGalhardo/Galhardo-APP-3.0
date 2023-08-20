import ZipCode from "../dataTypes/ZipCode";
import Primitives from "../dataTypes/Primitives";
import Strings from "../dataTypes/Strings";
import States from "../dataTypes/States";

type AddressArgs = {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
};

class Address {
    private readonly CEP = new ZipCode();
    private readonly UF = new States();
    private readonly PRIMITIVES = new Primitives();
    private readonly STRINGS = new Strings();

    constructor() {
        this.isValid = this.isValid.bind(this);
    }

    public generate(): AddressArgs {
        return {
            street: "Rua Teste",
            number: "123",
            complement: "Complemento Teste",
            neighborhood: "Bairro Teste",
            city: "Cidade Teste",
            state: "SP",
            zipCode: "12345678",
        };
    }

    public isValid(address: AddressArgs): boolean {
        const { city, complement, neighborhood, number, state, street, zipCode } = address;

        if (this.PRIMITIVES.hasValue(zipCode) && !this.CEP.isValid(zipCode)) return false;
        if (this.PRIMITIVES.hasValue(state) && !this.UF.isValid(state)) return false;
        if (this.PRIMITIVES.hasValue(city) && this.STRINGS.isLengthGreaterThan(city, 50)) return false;
        if (this.PRIMITIVES.hasValue(neighborhood) && this.STRINGS.isLengthGreaterThan(neighborhood, 100)) return false;
        if (this.PRIMITIVES.hasValue(street) && this.STRINGS.isLengthGreaterThan(street, 100)) return false;
        if (this.PRIMITIVES.hasValue(number) && this.STRINGS.isLengthGreaterThan(number, 20)) return false;

        if (this.PRIMITIVES.hasValue(complement) && this.STRINGS.isLengthGreaterThan(complement, 100)) return false;

        return true;
    }

    public get methods() {
        return {
            isValidUpdateAddress: this.isValid,
            generateAddress: this.generate,
        };
    }
}

export default Address;
