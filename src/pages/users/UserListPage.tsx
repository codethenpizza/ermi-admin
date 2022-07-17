import React from "react";
import {Button, Col, Modal, Row, Space} from "antd";
import {UsePaginationRespControlParams} from "@hooks";
import {UserTable} from "@containers/user/UserTable";
import {UserForm} from "@containers/user/UserForm";

export const UserListPage: React.FC = () => {

    const handleCreateClick = () => {
        const modal = Modal.info({
            title: 'Создание пользователя',
            content: <UserForm
                isEdit={true}
                hideEditIcon={true}
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

    let controls: UsePaginationRespControlParams<any>;

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
