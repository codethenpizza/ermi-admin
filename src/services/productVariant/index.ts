import {BaseCrudService} from "@services";
import {ProductVariant, ProductVariantImage, ProductVariantImageBulk} from "@types";

class ProductVariantService extends BaseCrudService<ProductVariant> {
    constructor() {
        super({endpoint: 'product_variant'});
    }

    async updateImages(productVariantId: number, pairs: ProductVariantImage[]): Promise<void> {
        await this.client.put(`${this.endpoint}/${productVariantId}/images`, pairs);
    }

    async updateImagesBulk(productVariantIds: number[], pairs: ProductVariantImageBulk[]): Promise<void> {
        await this.client.put(`${this.endpoint}/images`, {
            productVariantIds,
            pairs,
        });
    }
}

export const productVariantService = new ProductVariantService();
