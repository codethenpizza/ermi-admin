import {FC} from "react";
import {AUTH_ROUTES, ColumnDataType, CustomTableParams} from "@types";
import {useTablePagination} from "@hooks";
import {Table} from "@components";
import {rimService} from "@services/ProductTypeService";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Rim} from "../../../types/productTypes";
import {useTableFiltersStore} from "../../../store/slices/tableFilters";
import {composeRootTo} from "@utils";
import {useNavigate} from "react-router-dom";
import {getRimFilterName} from "@components/productType/rim/rimFiltersHelper";

export interface RimTableProps extends CustomTableParams<Rim> {
}

export const RimTable: FC<RimTableProps> = (props) => {

    const navigate = useNavigate();

    const handleRowClick = (item: Rim) => {
        navigate(composeRootTo(AUTH_ROUTES.PRODUCTS, item.product_id.toString(), 'variant', item.id.toString()));
    }

    const {getFilter} = useTableFiltersStore();

    const columns: ColumnDataType<Rim>[] = [
        {
            title: '#',
            dataIndex: 'id',
            sorter: true,
            width: 70,
        },
        {
            title: 'product_id',
            dataIndex: 'product_id',
            width: 100,
        },
        // {
        //     title: 'Изображение',
        //     dataIndex: 'productVariant',
        //     render: (productVariant) => <Image
        //         width={200}
        //         src={productVariant?.images?.[0]?.original_uri}
        //         preview={false}
        //     />
        // },
        {
            title: 'brand',
            dataIndex: 'brand',
            filters: getFilter(getRimFilterName('brand')),
        },
        {
            title: 'model',
            dataIndex: 'model',
        },
        {
            title: 'name',
            dataIndex: 'name',
        },
        {
            title: 'color',
            dataIndex: 'color',
            filters: getFilter(getRimFilterName('color')),
        },
        {
            title: 'dia',
            dataIndex: 'dia',
            filters: getFilter(getRimFilterName('dia')),
        },
        {
            title: 'et',
            dataIndex: 'et',
            filters: getFilter(getRimFilterName('et')),
        },
        {
            title: 'beadlock',
            dataIndex: 'beadlock',
            render: (beadlock: boolean) => beadlock ? <CheckCircleOutlined/> : <CloseCircleOutlined/>,
        },
        {
            title: 'width',
            dataIndex: 'width',
            filters: getFilter(getRimFilterName('width')),
        },
        {
            title: 'diameter',
            dataIndex: 'diameter',
            filters: getFilter(getRimFilterName('diameter')),
        },
        {
            title: 'bolts_count',
            dataIndex: 'bolts_count',
            filters: getFilter(getRimFilterName('bolts_count')),
        },
        {
            title: 'bolts_spacing',
            dataIndex: 'bolts_spacing',
            filters: getFilter(getRimFilterName('bolts_spacing')),
        },
        {
            title: 'pcd',
            dataIndex: 'pcd',
            filters: getFilter(getRimFilterName('pcd')),
        },
        {
            title: 'type',
            dataIndex: 'type',
            filters: getFilter(getRimFilterName('type')),
        },
    ];

    const {paginationProps} = useTablePagination<Rim>({crudService: rimService, ...props});

    return <Table
        sticky={true}
        size={"small"}
        onRow={(item) => ({
            onClick: () => handleRowClick(item),
            ...(props?.onRow?.(item) || {}),
        })}
        {...paginationProps}
        columns={columns}
    />
}
