import {FC} from "react";
import {Modal, Button, Form, Row, Input} from "@components";
import {DefaultModalProps} from "types/modal";
import {User} from "@types";
import {useUsersStore} from "@store";

export type UserUpsertTableProps = {
    user?: User
} & DefaultModalProps

const TableUserUpsertModal: FC<UserUpsertTableProps> = ({user, isVisible, handleCancel, handleOk}) => {
    const { updateUser, createUser } = useUsersStore()

    const onFormSubmit = async (v: any) => {
        try {
            if (user?.id) {
                await updateUser(user.id, v)
            } else {
                await createUser(v)
            }
            handleOk()
        } catch (e) {
            console.log(e)
        }
    }

    if (!isVisible) {
        return null
    }

    return (
        // @ts-ignore
        <Modal visible={isVisible} footer={null}
               title={user?.name ? `Пользователь: ${user.name}` : 'Новый пользователь'}
               onOk={handleOk} onCancel={handleCancel}
        >
            <Form
                name="edit-user"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                initialValues={{
                    name: user?.name,
                    email: user?.email,
                    phone: user?.phone,
                }}
                onFinish={onFormSubmit}
                onFinishFailed={() => console.log('error')}

            >
                <Form.Item name="name" label="Имя" rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{required: true}]}>
                    <Input inputMode='email'  />
                </Form.Item>
                <Form.Item name="phone" label="Тел." rules={[{required: true}]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Пароль" rules={[{required: !user?.id}]}>
                    <Input />
                </Form.Item>
                <Row justify='end'>
                    <Button type="text" onClick={handleCancel}>
                        Отмена
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Row>
            </Form>
        </Modal>
    )
}

export {
    TableUserUpsertModal
}
