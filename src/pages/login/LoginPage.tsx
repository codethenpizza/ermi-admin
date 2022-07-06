import {FC} from "react";
import {LoginForm} from "./components/LoginForm";
import {Card, Row, Col} from "@components";

export const LoginPage: FC = () => {
    return (
        <Row justify='center' align='middle' className='vh-100'>
            <Col span={16} xs={32} md={16} lg={10}>
                <Card>
                    <LoginForm/>
                </Card>
            </Col>
        </Row>
    )
}
