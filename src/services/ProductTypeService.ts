import {BaseCrudService} from "@services/base-crud";

export type ProductFilters = Record<string, (string | number)[]>;

export class ProductTypeService extends BaseCrudService {

    filters?: ProductFilters;

    filtersRequest?: Promise<ProductFilters>;

    constructor(type: string) {
        super({endpoint: `views/${type}`});
    }

    async getFilters(): Promise<ProductFilters> {
        if (this.filters) {
            return this.filters;
        }

        if (this.filtersRequest) {
            return this.filtersRequest;
        }

        this.filtersRequest = this.client.get(`${this.endpoint}/filters`).then(x => x.data);

        const data = await this.filtersRequest;

        this.filtersRequest = undefined;

        return data;
    }
}

export const rimService = new ProductTypeService('rim');
