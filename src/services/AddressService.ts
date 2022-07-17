import {BaseCrudService} from "@services/base-crud";
import {Address} from "@types";

class AddressService extends BaseCrudService<Address> {
    constructor() {
        super({endpoint: 'address'});
    }
}

export const addressService = new AddressService();
