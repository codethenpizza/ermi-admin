import {BaseCrudService} from "@services/base-crud";
import {Invoice} from "@types";

class InvoiceService extends BaseCrudService<Invoice> {
    constructor() {
        super({endpoint: 'invoice'});
    }
}

export const invoiceService = new InvoiceService();
