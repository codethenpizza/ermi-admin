import {FC, useEffect, useState} from "react";
import {Table, TablePaginationConfig, Button} from "@components";
import {useOrderTableColumns} from "./hooks/use-user-table-columns";
import {useTableUserItem} from "./hooks/use-table-user-item";
import {ContextMenu, ContextMenuItems, useContextMenu} from "@containers";
import {TableUserItem} from "./types";
import {TableUserUpsertModal} from "../table-user-upsert-modal";
import {LoadingState, User} from "@types";
import {useUsersStore} from "store/slices/users";
import { TableHeader } from "@containers";

export type OrdersTableProps = {
    users: User[]
}

const UsersTable: FC<OrdersTableProps> = ({users}) => {
    const {limit, page, total, loadingState, fetchAllUsers, deleteUser} = useUsersStore()
    const columns = useOrderTableColumns()
    const dataSource = useTableUserItem(users)

    const items: ContextMenuItems<TableUserItem>[] = [
      {name: 'Редактировать', action: (r) => setEditableOption(users.find(u => u.id === r?.id))},
      {name: 'Удалить', action: (r) => r?.id && deleteUser(r?.id)},
    ]
    const {onContextMenuClick, contestMenuState } = useContextMenu<TableUserItem>(items)

    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [editableOption, setEditableOption] = useState<User | undefined>(undefined)

    const onModalClose = () => {
        setIsEditModalVisible(false)
        setEditableOption(undefined)
    }

    useEffect(() => {
        editableOption && setIsEditModalVisible(true)
    }, [editableOption])

    const handleTableChange = (pagination: TablePaginationConfig) => {
        fetchAllUsers({page: (pagination.current || 0) -1, limit: pagination.pageSize})
    }

    return (
        <>
            <TableHeader>
                <Button onClick={() => setIsEditModalVisible(true)}>Создать</Button>
            </TableHeader>
            <Table
                columns={columns}
                dataSource={dataSource}
                onRow={(record, rowIndex) => {
                    return {
                        onContextMenu: (e) => onContextMenuClick(e, record, rowIndex)
                    };
                }}
                pagination={{current: page || 0, pageSize: limit, total}}
                loading={loadingState === LoadingState.LOADING}
                onChange={handleTableChange}
            />
            <ContextMenu {...contestMenuState} />
            {isEditModalVisible && (
                <TableUserUpsertModal
                    isVisible={isEditModalVisible}
                    user={editableOption}
                    handleOk={onModalClose}
                    handleCancel={onModalClose}
                />
            )}
        </>
    )
}

export {
    UsersTable
}
