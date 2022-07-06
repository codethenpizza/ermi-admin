import {FC} from "react";

import {productService} from "@services";
import {useTablePagination} from "@hooks";
import {AUTH_ROUTES, ColumnDataType, CustomTableParams, Product} from "@types";
import {Table} from "@components";
import {useNavigate} from "react-router-dom";
import {composeRootTo} from "@utils";
import {useTableFiltersStore} from "../../store/slices/tableFilters";
import {useColumnSearchProps} from "@hooks/useColumnSearchProps";

export interface ProductTableParams extends CustomTableParams<Product> {
}

export const ProductTable: FC<ProductTableParams> = (params) => {

    const navigate = useNavigate();

    const handleRowClick = (item: Product) => {
        navigate(composeRootTo(AUTH_ROUTES.PRODUCTS, item.id.toString()))
    }

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

    const {paginationProps} = useTablePagination<Product>({crudService: productService, ...params});

    return <Table
        onRow={(item) => ({
            onClick: () => handleRowClick(item),
            ...(params?.onRow?.(item) || {}),
        })}
        {...paginationProps}
        columns={columns}
    />
}
