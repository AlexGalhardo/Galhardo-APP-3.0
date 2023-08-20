import Objects from "../dataTypes/Objects";
import Primitives from "../dataTypes/Primitives";

class Product {
    private readonly PRIMITIVES = new Primitives();
    private readonly OBJECTS = new Objects();

    constructor() {
        this.isValid = this.isValid.bind(this);
    }

    public isValid(product: { skuId?: string; financingAmount?: number }): boolean {
        if (!this.OBJECTS.hasKeys(product, "skuId", "financingAmount")) return false;
        if (!this.PRIMITIVES.isString(product.skuId)) return false;
        if (!this.PRIMITIVES.isNumber(product.financingAmount)) return false;

        return true;
    }

    public get methods() {
        return {
            isValidUpdateProduct: this.isValid,
        };
    }
}

export default Product;
