import {BaseCrudService} from "@services";
import {Offer} from "@types";

class OrderOfferService extends BaseCrudService<Offer> {
    constructor() {
        super({endpoint: 'order_offer'});
    }
}

export const orderOfferService = new OrderOfferService();
