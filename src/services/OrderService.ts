import {Order, ShippingType} from "types/orders";
import {BaseCrudService} from "./base-crud";

export class OrderService extends BaseCrudService<Order> {
    constructor() {
        super({endpoint: 'order'});
    }

    getShippingTypeList(): Promise<ShippingType[]> {
        return this.client.get<ShippingType[]>(`/${this.endpoint}/shipping_types`).then(x => x.data);
    }
}

export const orderService = new OrderService();
