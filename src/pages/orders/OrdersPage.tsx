import {FC, useEffect} from "react";
import {OrdersTable} from "./components";
import {useOrdersStore} from "@store";

const OrdersPage: FC = () => {
    const {orders, fetchOrders} = useOrdersStore(state => state)

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <OrdersTable orders={orders} />
    )
}

export {
    OrdersPage
}
