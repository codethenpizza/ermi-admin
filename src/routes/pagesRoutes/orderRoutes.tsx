import {RouteObject} from "react-router-dom";
import {OrdersPage} from "@pages";
import {OrderSinglePage} from "@pages/orders/OrderSinglePage";

export const orderRoutes: RouteObject[] = [
    {
        index: true,
        element: <OrdersPage/>,
    },
    {
        path: ':id',
        element: <OrderSinglePage />
    },
];
