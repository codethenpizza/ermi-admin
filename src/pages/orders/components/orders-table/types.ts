import {AntTableKey, Order} from "@types";

export type TableOrderItem = Pick<Order, 'id' | 'status' | 'total'> & {
 invoices: string
 discounts: string
 updated_at: string
 created_at: string
} & AntTableKey
