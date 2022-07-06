import {FC} from "react";
import {Modal, Button, Form, Select, Row} from "@components";
import {DefaultModalProps} from "types/modal";
import {Order, OrderStatus} from "@types";
import {useOrdersStore} from "@store";

export type OrderEditTableProps = {
    order: Order
} & DefaultModalProps

const TableOrderEditModal: FC<OrderEditTableProps> = ({order, isVisible, handleCancel, handleOk}) => {
    const {updateOrder} = useOrdersStore()

    const onFormSubmit = async (v: any) => {
        try {
            await updateOrder(order.id, v)
            handleOk()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        // @ts-ignore
        <Modal visible={isVisible} footer={null}
               title={`Заказ №${order.id}`}
               onOk={handleOk} onCancel={handleCancel}
        >
            <Form
                name="edit-order"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 24 }}
                initialValues={{
                    status: order?.status
                }}
                onFinish={onFormSubmit}
                onFinishFailed={() => console.log('error')}

            >
                <Form.Item name="status" label="Статус" rules={[{required: true}]}>
                    <Select
                        placeholder="Укажите статус заказа"
                    >
                        {Object.keys(OrderStatus).map(o => <Select.Option key={o} value={o}>{o}</Select.Option>)}
                    </Select>
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
    TableOrderEditModal
}
