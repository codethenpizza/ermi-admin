import {FC} from "react";
import {orderService} from "@services";
import {AUTH_ROUTES, ColumnDataType, CustomTableParams} from "@types";
import {Order} from "@types";
import {Table} from "@components";
import {useTablePagination} from "@hooks";
import {useNavigate} from "react-router-dom";
import {composeRootTo} from "@utils";

export interface OrderListParams extends CustomTableParams<Order> {
}

export const OrderList: FC<OrderListParams> = (params ) => {

    const navigate = useNavigate();

    const handleRowClick = (item: Order) => {
        navigate(composeRootTo(AUTH_ROUTES.ORDERS, item.id.toString()))
    }

    const columns: ColumnDataType<Order>[] = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
        },
        {
            title: 'Способ оплаты',
            dataIndex: 'payment_strategy_id',
            render: (value: number, record: Order) => record.paymentStrategy.name,
        },
        {
            title: 'Total',
            dataIndex: 'total',
        },
    ];

    const {paginationProps} = useTablePagination<Order>({crudService: orderService, ...params});


    return <Table
        onRow={(item) => ({
            onClick: () => handleRowClick(item),
            ...(params?.onRow?.(item) || {}),
        })}
        {...paginationProps}
        columns={columns}
    />
}
