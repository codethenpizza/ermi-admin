import {orderService} from "@services";
import create from "zustand";
import {devtools} from "zustand/middleware";
import {Order} from "@types";
import {unionBy} from 'lodash'

export type OrdersSliceState = {
    orders: Order[]
    fetchOrders: () => void
    updateOrder: (orderId: Order['id'], order: Partial<Order>) => void
}

const useOrdersStore = create<OrdersSliceState>(devtools((set) => ({
    orders: [],
    fetchOrders: async () => {
        const res = await orderService.fetchAllOrders();
        set(() => ({orders: res || []}))
    },
    updateOrder: async (orderId, order) => {
        await orderService.updateOrder(orderId, order);
        set((state) => {
            const oldOrder = state.orders.find(o => o.id === orderId)
            const newOrder = {
                ...oldOrder,
                ...order
            }
            state.orders = unionBy([newOrder as Order], state.orders, 'id')
        })
    }
})))

export {
    useOrdersStore
}
