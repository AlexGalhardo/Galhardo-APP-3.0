import ZipCode from "./dataTypes/ZipCode";
import CPF from "./dataTypes/CPF";
import Email from "./dataTypes/Email";
import Phone from "./dataTypes/Phone";
import States from "./dataTypes/States";
import Primitives from "./dataTypes/Primitives";
import Objects from "./dataTypes/Objects";
import Strings from "./dataTypes/Strings";
import Milliseconds from "./dataTypes/Milliseconds";
import CompositeData from "./compositeDataTypes/CompositeData";
import Name from "./dataTypes/Name";
import Password from "./dataTypes/Password";
class DataManager {
    private static readonly CPF = new CPF();
    private static readonly EMAIL = new Email();
    private static readonly PHONE = new Phone();
    private static readonly ZIP_CODE = new ZipCode();
    private static readonly STATES = new States();
    private static readonly PRIMITIVES = new Primitives();
    private static readonly OBJECTS = new Objects();
    private static readonly STRINGS = new Strings();
    private static readonly MILLISECONDS = new Milliseconds();
    private static readonly COMPOSITE_DATA = new CompositeData();
    private static readonly NAME = new Name();
    private static readonly PASSWORD = new Password();

    static get names() {
        return this.NAME;
    }

    static get compositeData() {
        return this.COMPOSITE_DATA;
    }

    static get milliseconds() {
        return this.MILLISECONDS;
    }

    static get strings() {
        return this.STRINGS;
    }

    static get objects() {
        return this.OBJECTS;
    }

    static get primitives() {
        return this.PRIMITIVES;
    }

    static get states() {
        return this.STATES;
    }

    static get zipCode() {
        return this.ZIP_CODE;
    }

    static get cpf() {
        return this.CPF;
    }

    static get email() {
        return this.EMAIL;
    }

    static get phone() {
        return this.PHONE;
    }

    static get password() {
        return this.PASSWORD;
    }

    static get methods() {
        return {
            ...this.ZIP_CODE.methods,
            ...this.CPF.methods,
            ...this.EMAIL.methods,
            ...this.PHONE.methods,
            ...this.STATES.methods,
            ...this.OBJECTS.methods,
            ...this.PRIMITIVES.methods,
            ...this.STRINGS.methods,
            ...this.MILLISECONDS.methods,
            ...this.COMPOSITE_DATA.methods,
            ...this.NAME.methods,
            ...this.PASSWORD.methods,
        };
    }
}

export default DataManager;
