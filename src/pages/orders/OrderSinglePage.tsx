import {FC, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Order} from "@types";
import {orderService} from "@services";
import {Skeleton} from "antd";
import {OrderForm} from "../../containers/order/OrderForm";

export const OrderSinglePage: FC = () => {

    const params = useParams();
    const id = parseInt(params.id || '');

    const [order, setOrder] = useState<Order | null>(null);


    useEffect(() => {
        if (!isNaN(id)) {
            orderService.fetchItem(id)
                .then(setOrder);
        }
    }, [id]);

    if (!order) {
        return <Skeleton/>;
    }

    return (
        <OrderForm order={order} />
    );
}
