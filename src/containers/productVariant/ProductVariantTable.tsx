import {FC} from "react";
import {ColumnDataType, CustomTableProps, ProductVariant} from "@types";
import {useTablePagination} from "@hooks";
import {Table} from "@components";
import {productVariantService} from "@services/productVariant";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Card, Image} from "antd";
import {useColumnSearchProps} from "@hooks/useColumnSearchProps";

export interface ProductVariantTableProps extends CustomTableProps<ProductVariant> {
}

export const ProductVariantTable: FC<ProductVariantTableProps> = (props) => {

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

    return (
        <Card title="Список вариантов продуктов">
            <Table
                {...paginationProps}
                columns={columns}
            />
        </Card>
    );
}
