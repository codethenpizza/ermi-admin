import {Order} from "types/orders";
import {BaseCrudService} from "../base-crud";

class OrderService extends BaseCrudService<Order> {
    constructor() {
        super({endpoint: 'order'});
    }
}

export const orderService = new OrderService();
