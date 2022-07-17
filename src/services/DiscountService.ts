import {BaseCrudService} from "@services/base-crud";
import {Discount} from "@types";

class DiscountService extends BaseCrudService<Discount> {
    constructor() {
        super({endpoint: 'discount'});
    }
}

export const discountService = new DiscountService();
