import create from "zustand";
import {orderService} from "@services";
import {devtools} from "zustand/middleware";
import {Order} from "@types";
import {unionBy} from 'lodash'
import {immer} from "zustand/middleware/immer";

export type OrdersSliceState = {
    orders: Order[]
    fetchOrders: () => void
    updateOrder: (orderId: Order['id'], order: Partial<Order>) => void
}

export const useOrdersStore = create<OrdersSliceState>()(devtools(immer(
    ((set) => ({
        orders: [],
        fetchOrders: async () => {
            const res = await orderService.fetchList({limit: 100, offset: 0});
            set(() => ({orders: res.rows || []}))
        },
        updateOrder: async (orderId, order) => {
            await orderService.updateItem(orderId, order);
            set((state) => {
                const oldOrder = state.orders.find(o => o.id === orderId)
                const newOrder = {
                    ...oldOrder,
                    ...order
                }
                state.orders = unionBy([newOrder as Order], state.orders, 'id')
            })
        }
    }))
)));
