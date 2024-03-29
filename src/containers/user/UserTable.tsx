import React from "react";
import {ColumnDataType, CustomTableProps, User} from "@types";
import {UsePaginationRespControlParams, useTablePagination} from "@hooks";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Table} from "@components";
import {userService} from "@services/users";
import {Card, Modal} from "antd";
import {UserForm} from "./UserForm";

export interface UserTableProps extends CustomTableProps<User> {
    controls?: (controls: UsePaginationRespControlParams<User>) => void;
}

export const UserTable: React.FC<UserTableProps> = (props) => {

    const handleRowClick = (user: User) => {
        const modal = Modal.info({
            title: 'Редактирование пользователя',
            content: <UserForm
                user={user}
                isEdit={true}
                hideEditIcon={true}
                onAfterSubmit={async () => {
                    await controlParams.updateList();
                    modal.destroy()
                }}
                onCancelEdit={() => modal.destroy()}
            />,
            icon: null,
            maskClosable: true,
            okButtonProps: {hidden: true}
        })
    }

    const columns: ColumnDataType<User>[] = [
        {
            title: '#',
            dataIndex: 'id',
            sorter: true,
        },
        {
            title: 'Имя',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
        },
        {
            title: 'Админ',
            dataIndex: 'is_admin',
            render: (isAdmin: boolean) => isAdmin ? <CheckCircleOutlined/> : <CloseCircleOutlined/>,
            filters: [
                { text: 'Админ', value: 1 },
                { text: 'Не админ', value: 0 },
            ]
        },
        {
            title: 'B2B группа',
            dataIndex: 'b2b_discount_group_id',
            render: (id: number) => id ? id : '-',
        }
    ];

    const {paginationProps, controlParams} = useTablePagination<User>({crudService: userService, ...props});
    props.controls?.(controlParams);

    return <Card title="Список пользователей">
        <Table
            {...paginationProps}
            onRow={(item) => ({
                onClick: () => handleRowClick(item),
                ...(props?.onRow?.(item) || {}),
            })}
            columns={columns}
        />
    </Card>
}
