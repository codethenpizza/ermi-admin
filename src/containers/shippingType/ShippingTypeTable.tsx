import {FC} from "react";
import {ColumnDataType, CustomTableProps, ShippingType} from "@types";
import {useTablePagination} from "@hooks";
import {Card, Table} from "antd";
import {shippingTypeService} from "@services/ShippingTypeService";

export interface ShippingTypeTableProps extends CustomTableProps<ShippingType> {
}

export const ShippingTypeTable: FC<ShippingTypeTableProps> = (props) => {

    const columns: ColumnDataType<ShippingType>[] = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Название',
            dataIndex: 'name',
        },
        {
            title: 'Описание',
            dataIndex: 'desc',
        },
        {
            title: 'Доступность',
            dataIndex: 'enabled',
        },
    ];

    const {paginationProps} = useTablePagination<ShippingType>({crudService: shippingTypeService, ...props});

    return (
        <Card title="Список типов доставок">
            <Table
                {...paginationProps}
                columns={columns}
            />
        </Card>
    );
}
