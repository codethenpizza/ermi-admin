import {TableColumnsType} from "@components";
import {TableUserItem} from "../types";

// add type
export const useOrderTableColumns = (): TableColumnsType<TableUserItem> => ([
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Admin',
        dataIndex: 'is_admin',
        key: 'is_admin',
    },
    {
        title: 'B2B discount group',
        dataIndex: 'b2b_discount_group_id',
        key: 'b2b_discount_group_id',
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









