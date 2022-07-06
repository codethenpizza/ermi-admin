import {FC, useEffect, useState} from "react";
import {Table} from "@components";
import {Order} from "types/orders";
import {useOrderTableColumns} from "./hooks/use-orders-table-columns";
import {useTableOrderItem} from "./hooks/use-table-order-item";
import {ContextMenu, ContextMenuItems, useContextMenu} from "@containers";
import {TableOrderItem} from "./types";
import {TableOrderEditModal} from "../table-order-edit-modal";

export type OrdersTableProps = {
    orders: Order[]
}

const OrdersTable: FC<OrdersTableProps> = ({orders}) => {
    const columns = useOrderTableColumns()
    const dataSource = useTableOrderItem(orders)

    const items: ContextMenuItems<TableOrderItem>[] = [{name: 'edit', action: (r) => setEditableOption(orders.find(o => o.id === r?.id))}]
    const {onContextMenuClick, contestMenuState } = useContextMenu<TableOrderItem>(items)

    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [editableOption, setEditableOption] = useState<Order | undefined>(undefined)

    const onModalClose = () => {
        setIsEditModalVisible(false)
        setEditableOption(undefined)
    }

    useEffect(() => {
        editableOption && setIsEditModalVisible(true)
    }, [editableOption])

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource}
                onRow={(record, rowIndex) => {
                    return {
                        onContextMenu: (e) => onContextMenuClick(e, record, rowIndex)
                    };
                }}
            />
            <ContextMenu {...contestMenuState} />
            {editableOption && (
                <TableOrderEditModal
                    isVisible={isEditModalVisible}
                    order={editableOption}
                    handleOk={onModalClose}
                    handleCancel={onModalClose}
                />
            )}
        </>
    )
}

export {
    OrdersTable
}
