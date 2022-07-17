import React, {FC} from "react";
import {ColumnDataType, CustomTableProps, OrderOffer} from "@types";
import {useTablePagination} from "@hooks";
import {Table} from "@components";
import {orderOfferService} from "@services/OrderOfferService";
import {AddEntitiesToTableParams, EntityTableEditParams, useEntityTableEdit} from "@hooks/useEntityTableEdit";
import Card from "antd/es/card/Card";
import {OrderOfferAddModal} from "./OrderOfferAddModal";
import {Modal, ModalFuncProps} from "antd";
import {OrderOfferForm} from "./OrderOfferForm";

export interface OrderOfferTableProps extends CustomTableProps<OrderOffer>, EntityTableEditParams<OrderOffer> {
}

export const OrderOfferTable: FC<OrderOfferTableProps> = (props) => {

    const {isEditable} = props;

    const columns: ColumnDataType<OrderOffer>[] = [
        {
            title: '#',
            dataIndex: 'id',
            render: (id?: number) => id || 'new',
        },
        {
            title: 'UID',
            dataIndex: ['offer', 'uid'],
        },
        {
            title: 'Товар',
            dataIndex: ['offer', 'productVariant', 'name'],
        },
        {
            title: 'Поставщик',
            dataIndex: ['offer', 'vendor', 'name'],
        },
        {
            title: 'Кол-во',
            dataIndex: 'qty',
        },
        {
            title: 'Цена за единицу',
            dataIndex: 'price',
        },
        {
            title: 'Сумма',
            dataIndex: 'id',
            render: (_, row) => row.price * row.qty,
        },
    ];

    const handleEditableRowClick = (item: OrderOffer) => {
        const modal = Modal.info({
            title: 'Редактирование',
            content: <OrderOfferForm
                orderOffer={item}
                onSubmit={(newItem) => {
                    updateListItem({...item, ...newItem}, (item: OrderOffer) => item.offer.uid);
                    modal.destroy();
                }}
            />,
            icon: null,
            maskClosable: true,
            okButtonProps: {hidden: true}
        });
    }

    const getRowKey = (item: OrderOffer) => item.offer.uid + item.qty + item.price;

    const addModalParams: ModalFuncProps & AddEntitiesToTableParams = {
        title: 'Выбор товара',
        width: '90vw',
        content: <OrderOfferAddModal />,
        icon: null,
        maskClosable: true,
        okButtonProps: {hidden: true}
    }

    const {
        handleSelect,
        list,
        actionButtons,
        updateListItem,
    } = useEntityTableEdit<OrderOffer>({...props, rowKey: getRowKey, addModalParams});

    const {paginationProps} = useTablePagination<OrderOffer>({crudService: orderOfferService, ...props, rowKey: getRowKey, list});

    return (
        <Card title="Список товаров" extra={actionButtons}>
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
