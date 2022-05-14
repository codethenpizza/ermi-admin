import {Order} from "types/orders";
import {BaseService} from "../base-service";

export class OrderService extends BaseService<Order> {
    constructor() {
        super({endpoint: 'order'});
    }
}
