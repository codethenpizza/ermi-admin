import {ermiClient} from '@utils'
import {Order} from "types/orders";

export const fetchAllOrders = async (): Promise<Order[]> => {
    const resp = await ermiClient.request<Order[]>({
        method: 'get',
        url: '/order/list',
    })
    return resp.data
}

export const updateOrder = async (orderId: Order['id'], propertiesToUpdate: Partial<Order>): Promise<any>  => {
    const resp = await ermiClient.request<Order[]>({
        method: 'put',
        url: `/order/${orderId}`,
        data: {
            ...propertiesToUpdate
        }
    })
    return resp.data
}
