import {FC} from "react";
import {AUTH_ROUTES, ColumnDataType, CustomTableParams, ProductVariant} from "@types";
import {useTablePagination} from "@hooks";
import {Table} from "@components";
import {productVariantService} from "@services/productVariant";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {composeRootTo} from "@utils";
import { Image } from "antd";
import {useColumnSearchProps} from "@hooks/useColumnSearchProps";

export interface ProductVariantTableProps extends CustomTableParams<ProductVariant> {
}

export const ProductVariantTable: FC<ProductVariantTableProps> = (props) => {

    const navigate = useNavigate();

    const handleRowClick = (item: ProductVariant) => {
        navigate(composeRootTo(AUTH_ROUTES.PRODUCTS, item.product_id.toString(), 'variant', item.id.toString()));
    }

    const {paginationProps} = useTablePagination<ProductVariant>({crudService: productVariantService, ...props});

    const columns: ColumnDataType<ProductVariant>[] = [
        {
            title: '#',
            dataIndex: 'id',
            sorter: true,
        },
        {
            title: '',
            dataIndex: 'id',
            render: (_, item) => <Image
                width={200}
                src={item?.images?.[0]?.original_uri}
                preview={false}
            />
        },
        {
            title: 'uid',
            dataIndex: 'uid',
        },
        {
            title: 'Наименование',
            dataIndex: 'name',
            ...useColumnSearchProps(),
        },
        {
            title: 'Доступность',
            dataIndex: 'is_available',
            render: (isAvailable: boolean) => isAvailable ? <CheckCircleOutlined/> : <CloseCircleOutlined/>,
            filters: [{text: 'Доступно', value: 1}, {text: 'Не доступно', value: 0}],
        },
        {
            title: 'Кол-во оферов',
            dataIndex: 'id',
            render: (_, item) => item.offers.length,
        },
    ];

    return <Table
        onRow={(item) => ({
            onClick: () => handleRowClick(item),
            ...(props?.onRow?.(item) || {}),
        })}
        {...paginationProps}
        columns={columns}
    />
}
