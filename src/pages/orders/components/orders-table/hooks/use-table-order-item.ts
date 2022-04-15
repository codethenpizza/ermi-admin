import {Order} from "@types";
import {useMemo} from "react";
import {TableOrderItem} from "../types";
import { format } from 'date-fns'

const orderDateFormat = 'HH:mm:ss dd:MM:yyyy'

const getInvoicesList = (invoices: Order['invoices']): string => {
    const invoiceStrings = invoices.map(({desc, value, is_paid}) => `${desc} - ${value} (${is_paid ? 'Оплачено' : 'Не оплачено'})`)
    return invoiceStrings.join('\n')
}

export const useTableOrderItem = (orders: Order[]): TableOrderItem[] => {
    return useMemo(() => {
         return orders.map(({invoices, discounts, id, status, total, created_at, updated_at}) => ({
            id,
            status,
            total,
            key: `${id}`,
            discounts: JSON.stringify(discounts),
            invoices: getInvoicesList(invoices),
            created_at: format(new Date(created_at), orderDateFormat),
            updated_at: format(new Date(updated_at), orderDateFormat),
        }))
    }, [orders])
}
