import {BaseCrudService} from "@services";
import {AttrValue} from "@types";

class AttrValueService extends BaseCrudService<AttrValue> {
    constructor() {
        super({endpoint: 'attr_values'});
    }
}

export const attrValueService = new AttrValueService();
