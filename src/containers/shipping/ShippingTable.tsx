import React, {FC} from "react";
import {ColumnDataType, CustomTableProps, Shipping} from "@types";
import {AddEntitiesToTableParams, EntityTableEditParams, useEntityTableEdit} from "@hooks/useEntityTableEdit";
import {Modal, ModalFuncProps} from "antd";
import {ShippingForm} from "./ShippingForm";
import {useTablePagination} from "@hooks";
import Card from "antd/es/card/Card";
import {Table} from "@components";
import {shippingService} from "@services/ShippingService";
import {addressToString} from "../../utils/helpers";
import {ShippingAddModal} from "@containers/shipping/ShippingAddModal";

export interface ShippingTableProps extends CustomTableProps<Shipping>, EntityTableEditParams<Shipping> {

}

export const ShippingTable: FC<ShippingTableProps> = (props) => {

    const {isEditable} = props;

    const columns: ColumnDataType<Shipping>[] = [
        {
            title: '#',
            dataIndex: 'id',
            render: (id?: number) => id || 'new',
        },
        {
            title: 'Тип доставки',
            dataIndex: 'shipping_type_id',
            render: (_, row) => row.shippingType.name,
        },
        {
            title: 'Статус',
            dataIndex: 'status',
        },
        {
            title: 'Адрес',
            dataIndex: 'address_id',
            render: (_, row) => addressToString(row.address),
        },
        {
            title: 'Стоимость',
            dataIndex: 'cost',
        },
        {
            title: 'Комментарий',
            dataIndex: 'comment',
        },
        {
            title: 'Дата от',
            dataIndex: 'delivery_date_from',
        },
        {
            title: 'Дата до',
            dataIndex: 'delivery_date_to',
        },
    ];

    const handleEditableRowClick = (item: Shipping) => {
        const modal = Modal.info({
            title: 'Редактирование',
            content: <ShippingForm
                hideEditIcon={true}
                isEdit={true}
                shipping={item}
                onSubmit={(newItem) => {
                    updateListItem({...item, ...newItem});
                    modal.destroy();
                }}
                onCancelEdit={() => {
                    modal.destroy();
                }}
            />,
            icon: null,
            maskClosable: true,
            okButtonProps: {hidden: true}
        });
    }

    const addModalParams: ModalFuncProps & AddEntitiesToTableParams = {
        title: 'Выбор доставки',
        width: '90vw',
        content: <ShippingAddModal />,
        icon: null,
        maskClosable: true,
        okButtonProps: {hidden: true}
    }

    const {
        handleSelect,
        list,
        actionButtons,
        updateListItem,
    } = useEntityTableEdit({...props, addModalParams});

    const {paginationProps} = useTablePagination<Shipping>({crudService: shippingService, ...props, list});

    return (
        <Card title="Список доставок" extra={actionButtons}>
            <Table
                rowSelection={isEditable ? {
                    type: 'checkbox',
                    onChange: handleSelect,
                    ...(props.rowSelection || {}),
                } : undefined}
                {...paginationProps}
                onRow={(item) => ({
                    ...(props.onRow?.(item) || {}),
                    ...(isEditable ? {onClick: () => handleEditableRowClick(item)} : {})
                })}
                columns={columns}
            />
        </Card>
    );
}
