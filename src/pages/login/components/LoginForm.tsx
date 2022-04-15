import {FC} from "react";
import {Form, Input, Button} from "@components";
import {useAuthStore} from "@store";

const initValues = {
    email: process.env.REACT_APP_ADMIN_LOGIN || '',
    password: process.env.REACT_APP_ADMIN_PASSWORD || ''
}

const LoginForm: FC = () => {
    const login = useAuthStore(state => state.login)

    const onFailed = () => {
        // show login error
    }

    return (
        <Form
            name="login"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 24 }}
            onFinish={login}
            onFinishFailed={onFailed}
            autoComplete="off"
            initialValues={initValues}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'нужен email!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'проль пжлст!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Войти
                </Button>
            </Form.Item>
        </Form>
    )
}

export {
    LoginForm
}
