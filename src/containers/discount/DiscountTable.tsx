import React, {FC} from "react";
import {ColumnDataType, CustomTableProps, Discount} from "@types";
import {AddEntitiesToTableParams, EntityTableEditParams, useEntityTableEdit} from "@hooks/useEntityTableEdit";
import {useTablePagination} from "@hooks";
import {discountService} from "@services/DiscountService";
import Card from "antd/es/card/Card";
import {Table} from "@components";
import {Modal, ModalFuncProps} from "antd";
import {DiscountForm} from "./DiscountForm";
import {OrderOfferAddModal} from "@containers/orderOffer/OrderOfferAddModal";
import {DiscountAddModal} from "@containers/discount/DiscountAddModal";

export interface DiscountTableProps extends CustomTableProps<Discount>, EntityTableEditParams<Discount>{

}

export const DiscountTable: FC<DiscountTableProps> = (props) => {

    const {isEditable} = props;

    const columns: ColumnDataType<Discount>[] = [
        {
            title: '#',
            dataIndex: 'id',
            render: (id?: number) => id || 'new',
        },
        {
            title: 'ID заказа',
            dataIndex: 'order_id',
        },
        {
            title: 'Тип скидки',
            dataIndex: ['discountType', 'name'],
        },
        {
            title: 'Сумма скидки',
            dataIndex: 'value',
        }
    ];

    const handleEditableRowClick = (item: Discount) => {
        const modal = Modal.info({
            title: 'Редактирование',
            content: <DiscountForm
                hideEditIcon={true}
                isEdit={true}
                discount={item}
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
        title: 'Выбор скидки',
        width: '90vw',
        content: <DiscountAddModal />,
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

    const {paginationProps} = useTablePagination<Discount>({crudService: discountService, ...props, list});

    return (
        <Card title="Список скидок" extra={actionButtons}>
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
