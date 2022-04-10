import {VFC} from "react";
import {LoginForm} from "./components/LoginForm";
import {Card, Row, Col} from "@components";

const LoginPage: VFC = () => {
    return (
        <Row justify={'center'} align={'middle'} className='vh-100'>
            <Col span={8}>
                <Card>
                    <LoginForm/>
                </Card>
            </Col>
        </Row>
    )
}

export {
    LoginPage
}
