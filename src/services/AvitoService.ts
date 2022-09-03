import {BaseCrudService} from "@services/base-crud";
import {AvitoAd, AvitoTemplate, AvitoTemplateTag} from "@types";

class AvitoAdService extends BaseCrudService<AvitoAd> {

    constructor() {
        super({endpoint: 'avito/ad'});
    }

    async fetchItem(itemId: number): Promise<AvitoAd> {
        throw new Error('Not implemented');
    }

    async createItem(data: Partial<AvitoAd>): Promise<AvitoAd> {
        throw new Error('Not implemented');
    }

    async updateItem(itemId: number, data: Partial<AvitoAd>): Promise<AvitoAd> {
        throw new Error('Not implemented');
    }

    async deleteItem(itemId: number): Promise<boolean> {
        throw new Error('Not implemented');
    }


    public async setActive(ids: number | number[], active: boolean): Promise<void> {

        const url = `/${this.endpoint}/set_active`;

        await this.client.request({
            method: 'post',
            url,
            data: {
                ids,
                active,
            },
        });
    }

    public async setTemplate(ids: number | number[], templateId: number): Promise<void> {

        const url = `/${this.endpoint}/set_template`;

        await this.client.request({
            method: 'post',
            url,
            data: {
                ids,
                templateId,
            },
        });
    }

    public async generateFile(): Promise<void> {

        const url = `/${this.endpoint}/generateFile`;

        await this.client.request({
            method: 'post',
            url,
        });
    }

}


class AvitoTemplateService extends BaseCrudService<AvitoTemplate> {

    constructor() {
        super({endpoint: 'avito/template'});
    }

    public async setDefault(templateID: number): Promise<void> {
        const url = `/${this.endpoint}/${templateID}/default`;

        await this.client.request({
            method: 'put',
            url,
        });
    }

    public async getTags(): Promise<AvitoTemplateTag[]> {
        const url = `/${this.endpoint}/tags`;

        const resp = await this.client.request<AvitoTemplateTag[]>({
            method: 'get',
            url,
        });

        return resp.data;
    }
}


export const avitoAdService = new AvitoAdService();

export const avitoTemplateService = new AvitoTemplateService();
