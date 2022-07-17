import {BaseCrudService} from "@services/base-crud";
import {DiscountType} from "@types";

class DiscountTypeService extends BaseCrudService<DiscountType> {
    constructor() {
        super({endpoint: 'discount_type'});
    }
}

export const discountTypeService = new DiscountTypeService();
