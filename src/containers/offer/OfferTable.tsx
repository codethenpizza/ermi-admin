import React from "react";
import {ColumnDataType, CustomTableProps, Offer} from "@types";
import {useTablePagination} from "@hooks";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Table} from "@components";
import {offerService} from "@services/offerService";
import {parseStock} from "../../utils/helpers";
import {Card} from "antd";

export interface OfferTableProps extends CustomTableProps<Offer> {
}

export const OfferTable: React.FC<OfferTableProps> = (props) => {

    // const navigate = useNavigate();

    const handleRowClick = (item: Offer) => {
        // navigate(composeRootTo(AUTH_ROUTES.PRODUCTS, item.id.toString()));
    }

    const {paginationProps} = useTablePagination<Offer>({crudService: offerService, ...props});

    const columns: ColumnDataType<Offer>[] = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Поставщик',
            dataIndex: 'vendor_id',
            render: (_, row) => row.vendor.name,
        },
        {
            title: 'Артикул поставщика',
            dataIndex: 'vendor_code',
        },
        {
            title: 'Кол-во',
            dataIndex: 'in_stock_qty',
        },
        {
            title: 'Цена со скидкой',
            dataIndex: 'discount_price',
            render: (discountPrice) => discountPrice === 0 ? '-' : discountPrice,
        },
        {
            title: 'Цена',
            dataIndex: 'price',
        },
        {
            title: 'Доступность',
            dataIndex: 'is_available',
            render: (isAvailable: boolean) => isAvailable ? <CheckCircleOutlined/> : <CloseCircleOutlined/>,
        },
        {
            title: 'Приоритетный',
            dataIndex: 'priority',
            render: (priority: boolean) => priority ? <CheckCircleOutlined/> : <CloseCircleOutlined/>,
        },
        {
            title: 'Склады',
            dataIndex: 'stock',
            render: (stock: string) => <StockPreview stock={stock}/>
        }
    ];

    const StockPreview: React.FC<{ stock: string }> = ({stock}) => {
        return <>
            {
                parseStock(stock).map(x =>
                    <p key={x.name}>
                        Склад: {x.name}; Доставка от {x.shippingTime.from} до {x.shippingTime.to} дней; Кол-во {x.count}
                    </p>
                )
            }
        </>
    }

    return (
        <Card title="Список оферов">
            <Table
                onRow={(item) => ({
                    onClick: () => handleRowClick(item),
                    ...(props?.onRow?.(item) || {}),
                })}
                {...paginationProps}
                columns={columns}
            />
        </Card>
    );
}
