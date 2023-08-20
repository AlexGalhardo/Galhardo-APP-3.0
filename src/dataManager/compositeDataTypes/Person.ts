import CPF from "../dataTypes/CPF";
import Email from "../dataTypes/Email";
import Objects from "../dataTypes/Objects";
import Name from "../dataTypes/Name";
import Phone from "../dataTypes/Phone";
import Primitives from "../dataTypes/Primitives";
import Strings from "../dataTypes/Strings";
import Address from "./Address";

type PersonArgs = {
    name?: string;
    email?: string;
    phone?: string;
    documentNumber?: string;
    registryDocument?: string;
    address?: {
        street: string;
        number: string;
        complement?: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
    };
};

class Person {
    private readonly ADDRESS = new Address();
    private readonly PRIMITIVES = new Primitives();
    private readonly STRINGS = new Strings();
    private readonly EMAIL = new Email();
    private readonly PHONE = new Phone();
    private readonly OBJECTS = new Objects();
    private readonly CPF = new CPF();
    private readonly PERSON_NAME = new Name();

    constructor() {
        this.isValid = this.isValid.bind(this);
    }

    private isValid(person: PersonArgs): boolean {
        if (!this.PRIMITIVES.isObject(person)) return false;

        if (this.OBJECTS.hasKeys(person, "address") && !this.ADDRESS.isValid(person.address)) return false;

        const { documentNumber, email, name, phone, registryDocument } = person;

        if (this.PRIMITIVES.hasValue(name) && !this.PERSON_NAME.isValidFullName(name)) return false;
        if (this.PRIMITIVES.hasValue(email) && !this.EMAIL.isValid(email)) return false;
        if (this.PRIMITIVES.hasValue(phone) && !this.PHONE.isValid(phone)) return false;
        if (this.PRIMITIVES.hasValue(documentNumber) && !this.CPF.isValid(documentNumber)) return false;
        if (this.PRIMITIVES.hasValue(registryDocument) && this.STRINGS.isLengthGreaterThan(registryDocument, 20))
            return false;

        return true;
    }

    public get methods() {
        return {
            isValidUpdatePerson: this.isValid,
        };
    }
}

export default Person;
