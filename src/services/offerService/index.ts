import {BaseCrudService} from "@services";
import {Offer} from "@types";

class OfferService extends BaseCrudService<Offer> {
    constructor() {
        super({endpoint: 'offers'});
    }
}

export const offerService = new OfferService();
