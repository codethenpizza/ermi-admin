import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Order} from "@types";
import {orderService} from "@services";
import {Skeleton} from "antd";
import {OrderForm} from "@containers/order/OrderForm";

export const OrderSinglePage: FC = () => {

    const params = useParams();
    const id = parseInt(params.id || '');

    const [order, setOrder] = useState<Partial<Order> | undefined>(undefined);

    const isNew = isNaN(id);


    useEffect(() => {
        if (!isNew) {
            orderService.fetchItem(id)
                .then(setOrder);
        }
    }, [id, isNew]);

    if (!order && !isNaN(id)) {
        return <Skeleton/>;
    }

    return (
        <OrderForm order={order} isEdit={isNew} />
    );
}
