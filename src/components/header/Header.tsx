import React from "react";
import {useAuthStore} from "@store";
import {Col, Dropdown, Menu, Row, Space} from "antd";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import styles from './Header.module.css';

export const Header: React.FC = () => {
    const {user, logout} = useAuthStore();

    const menu = (
        <Menu
            items={[
                {
                    key: 'exit',
                    danger: true,
                    label: 'Выход',
                    onClick: () => logout(),
                },
            ]}
        />
    );

    if (!user) {
        return <span/>;
    }

    return (
        <Row justify="end" className={styles.container}>
            <Col>
                <Dropdown overlay={menu}>
                    <Space>
                        {user.name} <UserOutlined className={styles.icon}/>
                        <DownOutlined/>
                    </Space>
                </Dropdown>
            </Col>
        </Row>
    );
}
