import {FC} from "react";

import {productService} from "@services";
import {useTablePagination} from "@hooks";
import {ColumnDataType, CustomTableProps, Product} from "@types";
import {Table} from "@components";
import {useTableFiltersStore} from "../../store/slices/tableFilters";
import {useColumnSearchProps} from "@hooks/useColumnSearchProps";
import {Card} from "antd";

export interface ProductTableProps extends CustomTableProps<Product> {
}

export const ProductTable: FC<ProductTableProps> = (props) => {

    const {getFilter} = useTableFiltersStore();

    const columns: ColumnDataType<Product>[] = [
        {
            title: '#',
            dataIndex: 'id',
            sorter: true,
        },
        {
            title: 'uid',
            dataIndex: 'uid',
            ...useColumnSearchProps(),
        },
        {
            title: 'Наименование',
            dataIndex: 'name',
            ...useColumnSearchProps(),
        },
        {
            title: 'Категория',
            dataIndex: 'attr_set_id',
            render: (_, item) => item.cats
                .sort((a, b) => a.position - b.position)
                .map(x => x.name)
                .join(' -> '),
            filters: getFilter('attr_set_id'),
        },
        {
            title: 'Кол-во вариантов',
            dataIndex: 'variants',
            render: (variants) => variants.length,
        }
    ];

    const {paginationProps} = useTablePagination<Product>({crudService: productService, ...props});

    return (
        <Card title="Список продуктов">
            <Table
                {...paginationProps}
                columns={columns}
            />
        </Card>
    );
}
