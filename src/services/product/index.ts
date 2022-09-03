import {BaseCrudService} from "../base-crud";
import {Product, ProductCategory} from "@types";

class ProductService extends BaseCrudService<Product> {
    constructor() {
        super({endpoint: 'products'});
    }

    async getCategories(): Promise<ProductCategory[]> {
        const url = `/product_cats`
        return this.client.get(url).then(x => x.data);
    }
}

export const productService = new ProductService();
