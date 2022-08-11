import {BaseCrudService} from "@services/base-crud";
import {Shipping} from "@types";

class ShippingService extends BaseCrudService<Shipping> {
    constructor() {
        super({endpoint: 'shipping'});
    }
}

export const shippingService = new ShippingService();
