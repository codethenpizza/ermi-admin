import {FC} from "react";
import {Form, Input, Button} from "@components";
import {useAuthStore} from "@store";
import {LoginRequestParams} from "@types";
import {useNavigate} from "react-router-dom";
import {Col, message, Row} from "antd";

const initValues = {
    email: '',
    password: '',
}

export const LoginForm: FC = () => {
    const login = useAuthStore(state => state.login)
    const navigate = useNavigate();

    const handleSubmit = async (value: LoginRequestParams) => {
        try {
            await login(value);
            navigate('/', {replace: true});
        } catch (e: any) {
            message.error('Не верный логин или пароль');
            console.error(e);
        }
    }

    return (
        <Form
            name="login"
            labelCol={{span: 4}}
            wrapperCol={{span: 24}}
            onFinish={handleSubmit}
            autoComplete="off"
            initialValues={initValues}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{required: true, message: 'нужен email!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[{required: true, message: 'проль пжлст!'}]}
            >
                <Input.Password/>
            </Form.Item>
            <Row justify="center">
                <Col>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Войти
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}
