import {TableColumnsType} from "@components";
import {TableOrderItem} from "../types";

// add type
export const useOrderTableColumns = (): TableColumnsType<TableOrderItem> => ([
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
    },
    {
        title: 'Discounts',
        dataIndex: 'discounts',
        key: 'discounts',
    },
    {
        title: 'Shipping',
        dataIndex: 'shipping',
        key: 'shipping',
    },
    {
        title: 'Invoices',
        dataIndex: 'invoices',
        key: 'invoices',
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_at',
        key: 'updated_at',
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at'
    }
])









