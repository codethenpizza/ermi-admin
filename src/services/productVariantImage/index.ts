import {BaseCrudService} from "@services";
import {BaseFetchListParams, ListResp, ProductVariantImage} from "@types";

class ProductVariantImageService extends BaseCrudService<ProductVariantImage> {
    constructor() {
        super({endpoint: 'product_variant_image'});
    }

    async fetchList(params?: BaseFetchListParams): Promise<ListResp<ProductVariantImage>> {
        return super.fetchList(params)
            .then(({count, rows}) =>
                ({
                    count: count * 2,
                    rows: [...rows, ...rows].sort((a, b) =>
                        a.position - b.position)
                }));
    }
}

export const productVariantImageService = new ProductVariantImageService();
