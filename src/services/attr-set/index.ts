import {BaseCrudService} from "@services";
import {AttrSet} from "@types";

class AttrSetService extends BaseCrudService<AttrSet> {
    constructor() {
        super({endpoint: 'attr_sets'});
    }
}

export const attrSetService = new AttrSetService();
