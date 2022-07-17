import {FC, useMemo} from "react";
import { ORDER_STATUS} from "@types";
import {Button, Card, Col, Row, Space} from "antd";
import {OrderOfferTable} from "../../orderOffer/OrderOfferTable";
import {ShippingTable} from "../../shipping/ShippingTable";
import {InvoiceTable} from "../../invoice/InvoiceTable";
import {DiscountTable} from "../../discount/DiscountTable";
import {EntityForm, EntityFormProps} from "@components/entity/EntityForm";
import {Select} from "antd/es";
import {DefaultOptionType} from "rc-select/lib/Select";
import {OrderFormHookProps, useOrderFormHook} from "./useOrderFormHook";

export interface OrderFormProps extends OrderFormHookProps {
}

export const OrderForm: FC<OrderFormProps> = (props) => {

    const {
        order = {},
    } = props;

    const statusOptions: DefaultOptionType[] = [
        {label: 'Новый', value: ORDER_STATUS.NEW},
        {label: 'В обработке', value: ORDER_STATUS.IN_PROGRESS},
        {label: 'Выполнен', value: ORDER_STATUS.COMPLETED},
        {label: 'Отменен', value: ORDER_STATUS.CANCELLED},
    ];

    const fields: EntityFormProps['fields'] = [
        {
            name: 'status',
            initialValue: order.status || ORDER_STATUS.NEW,
            label: 'Статус',
            children: <Select options={statusOptions} dropdownMatchSelectWidth={false}/>
        },
        {
            name: 'payment_strategy_id',
            initialValue: order.payment_strategy_id,
            label: 'Способ оплаты',
        },
    ];

    const formProps = useOrderFormHook({
        fields,
        ...props,
    });

    const {
        isEdit,
        getOrderRowClickHandlers,
        handleOrderPropListChange,
        actionButtons,
    } = formProps;

    const {
        handleOrderOfferRowClick,
        handleShippingRowClick
    } = getOrderRowClickHandlers();

    return (
        <Card title={order.id ? `Заказ №${order.id}` : 'Новый заказ'} extra={actionButtons}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <EntityForm {...formProps} />
                </Col>
                <Col span={24}>
                    {order.user && <p>Пользователь: (id
                        - {order.user.id}) {order.user.name} [{order.user.phone} | {order.user.email}]</p>}
                    <p>Итого: {order.total || 0}</p>
                </Col>
                <Col span={24}>
                    <OrderOfferTable
                        onRow={(item) => ({
                            onClick: () => handleOrderOfferRowClick(item),
                        })}
                        list={order.offers || []}
                        onListChange={handleOrderPropListChange('offers')}
                        isEditable={isEdit}
                    />
                </Col>
                <Col span={24}>
                    <ShippingTable
                        onRow={(item) => ({
                            onClick: () => handleShippingRowClick(item),
                        })}
                        list={order.shipping}
                        onListChange={handleOrderPropListChange('shipping')}
                        isEditable={isEdit}
                    />
                </Col>
                <Col span={24}>
                    <DiscountTable
                        list={order.discounts}
                        onListChange={handleOrderPropListChange('discounts')}
                        isEditable={isEdit}
                    />
                </Col>
                <Col span={24}>
                    <InvoiceTable
                        list={order.invoices}
                        onListChange={handleOrderPropListChange('invoices')}
                        isEditable={isEdit}
                    />
                </Col>
            </Row>
        </Card>
    );
}
