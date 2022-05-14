import {ermiClient} from "@utils";
import {FetchListParams, listResp, User} from "@types";

export type BaseServiceArgs = {
  endpoint: string
  baseOffset?: number
  baseLimit?: number
}

export class BaseService<T> {
  endpoint: string
  baseOffset: number
  baseLimit: number

  constructor({endpoint, baseLimit, baseOffset}: BaseServiceArgs) {
    this.endpoint = endpoint
    this.baseLimit = baseLimit || 50
    this.baseOffset = baseOffset || 0
  }

  public async fetchList({offset = this.baseOffset, limit = this.baseLimit}: FetchListParams): Promise<listResp<T>> {
    const resp = await ermiClient.request<listResp<T>>({
      method: 'get',
      url: `/${this.endpoint}/list`,
      params: {
        offset, limit
      }
    })
    return resp.data
  }

  public async fetchItem(itemId: number): Promise<T> {
    const resp = await ermiClient.request<T>({
      method: 'get',
      url: `/${this.endpoint}/${itemId}`,
    })
    return resp.data
  }

  public async createItem(data: Partial<T>): Promise<T> {
    const resp = await ermiClient.request<T>({
      method: 'post',
      url: `/${this.endpoint}/create`,
      data: data
    })
    return resp.data
  }

  public async updateItem(itemId: number, data: Partial<T>): Promise<T> {
    const resp = await ermiClient.request<T>({
      method: 'put',
      url: `/${this.endpoint}/${itemId}`,
      data: data
    })
    return resp.data
  }

  public async deleteItem(itemId: number): Promise<void> {
    await ermiClient.request<User[]>({
      method: 'delete',
      url: `/${this.endpoint}/${itemId}`,
    })
  }
}
