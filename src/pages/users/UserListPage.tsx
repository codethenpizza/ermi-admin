import React from "react";
import {Button, Col, Modal, Row, Space} from "antd";
import {UserTable} from "@components/user/UserTable";
import {UserForm} from "@components/user/UserForm";
import {UsePaginationRespControlParams} from "@hooks";

export const UserListPage: React.FC = () => {

    const handleCreateClick = () => {
        const modal = Modal.info({
            title: 'Создание пользователя',
            content: <UserForm
                isEdit={true}
                showEditIcon={false}
                onAfterSubmit={async () => {
                    await controls.updateList();
                    modal.destroy()
                }}
                onCancelEdit={() => modal.destroy()}
            />,
            icon: null,
            maskClosable: true,
            okButtonProps: {hidden: true}
        })
    }

    let controls: UsePaginationRespControlParams;

    return (
        <>
            <Row justify="end">
                <Col>
                    <Space>
                        <Button type="primary" onClick={handleCreateClick}>Создать</Button>
                    </Space>
                </Col>
            </Row>
            <UserTable controls={(c) => controls = c} />
        </>
    );
}
