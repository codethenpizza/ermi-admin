import {BaseCrudService} from "../base-crud";
import {Product} from "@types";

class ProductService extends BaseCrudService<Product> {
    constructor() {
        super({endpoint: 'products'});
    }
}

export const productService = new ProductService();
