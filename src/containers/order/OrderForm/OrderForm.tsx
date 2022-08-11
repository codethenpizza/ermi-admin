import {FC} from "react";
import {Card, Col, Row} from "antd";
import {OrderOfferTable} from "../../orderOffer/OrderOfferTable";
import {ShippingTable} from "../../shipping/ShippingTable";
import {InvoiceTable} from "../../invoice/InvoiceTable";
import {DiscountTable} from "../../discount/DiscountTable";
import {EntityForm} from "@components/entity/EntityForm";
import {OrderFormHookProps, useOrderFormHook} from "./useOrderFormHook";

export interface OrderFormProps extends OrderFormHookProps {
}

export const OrderForm: FC<OrderFormProps> = (props) => {

    const formProps = useOrderFormHook({
        ...props,
    });

    const {
        isEdit,
        getOrderRowClickHandlers,
        handleOrderPropListChange,
        actionButtons,
        order,
    } = formProps;

    const {
        handleOrderOfferRowClick,
        handleShippingRowClick
    } = getOrderRowClickHandlers();

    const isNew = !Boolean(order.id);

    return (
        <Card title={!isNew ? `Заказ №${order.id}` : 'Новый заказ'} extra={actionButtons}>
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
                {!isNew && <Col span={24}>
                    <InvoiceTable
                        list={order.invoices}
                        onListChange={handleOrderPropListChange('invoices')}
                        isEditable={isEdit}
                        hideDeleteButton={true}
                    />
                </Col>}
            </Row>
        </Card>
    );
}
