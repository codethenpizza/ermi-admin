import {BaseCrudService} from "@services/base-crud";
import {ShippingType} from "@types";

class ShippingTypeService extends BaseCrudService<ShippingType> {
    constructor() {
        super({endpoint: 'shipping_type'});
    }
}

export const shippingTypeService = new ShippingTypeService();
