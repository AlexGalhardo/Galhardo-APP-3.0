import Address from "./Address";
import Person from "./Person";
import Product from "./Product";

class CompositeData {
    private readonly ADDRESS = new Address();
    private readonly PERSON = new Person();
    private readonly PRODUCT = new Product();

    public get address() {
        return this.ADDRESS;
    }

    public get person() {
        return this.PERSON;
    }

    public get product() {
        return this.PRODUCT;
    }

    public get methods() {
        return {
            ...this.PRODUCT.methods,
            ...this.ADDRESS.methods,
            ...this.PERSON.methods,
        };
    }
}

export default CompositeData;
