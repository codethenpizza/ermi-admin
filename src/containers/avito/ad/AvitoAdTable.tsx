import React, {FC} from "react";
import {AUTH_ROUTES, AVITO_ROUTES, AvitoAd, ColumnDataType, CustomTableProps, ProductVariant} from "@types";
import {useTablePagination} from "@hooks";
import {Card} from "antd";
import {Table} from "@components";
import {avitoAdService} from "@services/AvitoService";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {composeRootTo} from "@utils";
import {useColumnSearchProps} from "@hooks/useColumnSearchProps";

export interface AvitoAdTableProps extends CustomTableProps<AvitoAd> {
}

export const AvitoAdTable: FC<AvitoAdTableProps> = (props) => {
    const navigate = useNavigate();

    const handleRowClick = (item: AvitoAd) => {
        // navigate(composeRootTo(AUTH_ROUTES.PRODUCTS, item.id.toString()));
    }

    const handleTemplateIdClick = (id: number) => {
        navigate(composeRootTo(AUTH_ROUTES.AVITO, AVITO_ROUTES.TEMPLATES, id.toString()));
    }

    const handleProductVariantIdClick = (item?: ProductVariant) => {
        if (!item) {
            return;
        }
        navigate(composeRootTo(AUTH_ROUTES.PRODUCTS, item.product_id.toString(), 'variant', item.id.toString()));
    }

    const {paginationProps} = useTablePagination<AvitoAd>({crudService: avitoAdService, ...props});

    const columns: ColumnDataType<AvitoAd>[] = [
        {
            title: '#',
            dataIndex: 'Id',
        },
        {
            title: 'AvitoId',
            dataIndex: 'AvitoId',
            ...useColumnSearchProps(),
        },
        {
            title: 'Заголовок',
            dataIndex: 'Title',
            ...useColumnSearchProps(),
        },
        {
            title: 'Описание',
            dataIndex: 'Description',
        },
        {
            title: 'Активный',
            dataIndex: 'active',
            render: (active: boolean) => active ? <CheckCircleOutlined/> : <CloseCircleOutlined/>,
        },
        {
            title: 'ID Шаблона',
            dataIndex: 'templateId',
            render: (id: number | null) => id && <a onClick={() => handleTemplateIdClick(id)}>{id}</a>
        },
        {
            title: 'Варианта продукта',
            dataIndex: 'productVariantId',
            render: (id: number | null, row) =>
                id && <a onClick={() => handleProductVariantIdClick(row.productVariant)}>{row.productVariant?.uid}</a>
        },
    ];

    return (
        <Card title="Список объявлений">
            <Table
                onRow={(item) => ({
                    onClick: () => handleRowClick(item),
                    ...(props?.onRow?.(item) || {}),
                })}
                {...paginationProps}
                rowKey={'Id'}
                columns={columns}
            />
        </Card>
    );
}
