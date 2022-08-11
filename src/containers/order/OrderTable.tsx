import {FC, ReactElement} from "react";
import {orderService} from "@services";
import {AUTH_ROUTES, ColumnDataType, CustomTableProps, User} from "@types";
import {Order} from "@types";
import {Table} from "@components";
import {useTablePagination} from "@hooks";
import {useNavigate} from "react-router-dom";
import {composeRootTo} from "@utils";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Card} from "antd";

export interface OrderListProps extends CustomTableProps<Order> {
    extraActions?: ReactElement;
}

export const OrderTable: FC<OrderListProps> = (props) => {

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
            title: 'Пользователь',
            dataIndex: ['user', 'name'],
        },
        {
            title: 'Контакты',
            dataIndex: 'user',
            render: (user: User) => `${user.phone} (${user.email})`,
        },
        {
            title: 'B2B',
            dataIndex: 'b2b_discount_id',
            render: (id: number) => id ? <CheckCircleOutlined/> : <CloseCircleOutlined/>,
        },
        {
            title: 'Способ оплаты',
            dataIndex: ['paymentStrategy', 'name'],
        },
        {
            title: 'Total',
            dataIndex: 'total',
        },
        {
            title: 'Дата создания',
            dataIndex: 'created_at',
        },
    ];

    const {paginationProps} = useTablePagination<Order>({crudService: orderService, ...props});


    return <Card title="Список заказов" extra={props.extraActions}>
        <Table
            onRow={(item) => ({
                onClick: () => handleRowClick(item),
                ...(props?.onRow?.(item) || {}),
            })}
            {...paginationProps}
            columns={columns}
        />
    </Card>
}
