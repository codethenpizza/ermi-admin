import React, {FC} from "react";
import {ColumnDataType, CustomTableProps, Invoice} from "@types";
import {useTablePagination} from "@hooks";
import {Table} from "@components";
import {invoiceService} from "@services/InvoiceService";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {EntityTableEditParams, useEntityTableEdit} from "@hooks/useEntityTableEdit";
import Card from "antd/lib/card/Card";
import {Modal} from "antd";
import {InvoiceForm} from "./InvoiceForm";

export interface InvoiceTableProps extends CustomTableProps<Invoice>, EntityTableEditParams<Invoice> {
}

export const InvoiceTable: FC<InvoiceTableProps> = (props) => {

    const {isEditable} = props;

    const columns: ColumnDataType<Invoice>[] = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'ID заказа',
            dataIndex: 'order_id',
        },
        {
            title: 'Описание',
            dataIndex: 'desc',
        },
        {
            title: 'Сумма',
            dataIndex: 'value',
        },
        {
            title: 'Статус оплаты',
            dataIndex: 'is_paid',
            render: (isPaid: boolean) => isPaid ? <CheckCircleOutlined/> : <CloseCircleOutlined/>,
        },
        {
            title: 'Создано',
            dataIndex: 'created_at',
        },
    ];

    const handleEditableRowClick = (item: Invoice) => {
        const modal = Modal.info({
            title: 'Редактирование',
            content: <InvoiceForm
                hideEditIcon={true}
                isEdit={true}
                invoice={item}
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

    const {
        handleSelect,
        list,
        actionButtons,
        updateListItem,
    } = useEntityTableEdit(props);

    const {paginationProps} = useTablePagination<Invoice>({crudService: invoiceService, ...props, list});

    return (
            <Card title="Список счетов" extra={actionButtons}>
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
