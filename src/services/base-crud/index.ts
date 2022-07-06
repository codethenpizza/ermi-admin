import {ermiClient} from "@utils";
import {BaseFetchListParams, ListResp} from "@types";
import {AxiosInstance} from "axios";

export type BaseCrudServiceParams = {
    endpoint: string
    baseOffset?: number
    baseLimit?: number
    client?: AxiosInstance;
}

export abstract class BaseCrudService<T = any> {
    protected readonly endpoint: string;
    protected readonly baseOffset: number;
    readonly baseLimit: number;
    protected readonly client: AxiosInstance;

    protected constructor({endpoint, baseLimit, baseOffset, client}: BaseCrudServiceParams) {
        this.endpoint = endpoint;
        this.baseLimit = baseLimit || 50;
        this.baseOffset = baseOffset || 0;
        this.client = client || ermiClient;
    }

    public async fetchList(params?: BaseFetchListParams): Promise<ListResp<T>> {
        const {
            offset = this.baseOffset,
            limit = this.baseLimit,
            filters,
            sort,
        } = params || {};

        const resp = await this.client.request<ListResp<T>>({
            method: 'get',
            url: `/${this.endpoint}`,
            params: {
                offset, limit, filters, sort
            }
        });
        return resp.data;
    }

    public async fetchItem(itemId: number): Promise<T> {
        const resp = await this.client.request<T>({
            method: 'get',
            url: `/${this.endpoint}/${itemId}`,
        });
        return resp.data;
    }

    public async createItem(data: Partial<T>): Promise<T> {
        const resp = await this.client.request<T>({
            method: 'post',
            url: `/${this.endpoint}`,
            data: data
        });
        return resp.data;
    }

    public async updateItem(itemId: number, data: Partial<T>): Promise<T> {
        const resp = await this.client.request<T>({
            method: 'put',
            url: `/${this.endpoint}/${itemId}`,
            data: data
        });
        return resp.data;
    }

    public async deleteItem(itemId: number): Promise<boolean> {
        return this.client.request({
            method: 'delete',
            url: `/${this.endpoint}/${itemId}`,
        }).then(x => x.status === 200);
    }
}
