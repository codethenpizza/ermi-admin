import {Outlet, RouteObject} from "react-router-dom";
import {composeTo} from "@utils";
import {AUTH_ROUTES} from "@types";
import {productRoutes} from "./pagesRoutes/productRoutes";
import {UserListPage} from "@pages/users/UserListPage";
import {productTypeRoutes} from "./pagesRoutes/productTypeRoutes";
import {orderRoutes} from "./pagesRoutes/orderRoutes";
import {avitoRoutes} from "./pagesRoutes/avitoRoutes";


export const protectedRoutes: RouteObject[] = [
    {
        index: true,
        element: <h1>dashboard</h1>,
    },
    {
        path: composeTo(AUTH_ROUTES.ORDERS),
        element: <Outlet/>,
        children: orderRoutes,
    },
    {
        path: composeTo(AUTH_ROUTES.PRODUCTS),
        element: <Outlet/>,
        children: productRoutes,
    },
    {
        path: composeTo(AUTH_ROUTES.USERS),
        element: <UserListPage />,
    },
    {
        path: composeTo(AUTH_ROUTES.PRODUCT_TYPES),
        element: <Outlet />,
        children: productTypeRoutes,
    },
    {
        path: composeTo(AUTH_ROUTES.AVITO),
        element: <Outlet/>,
        children: avitoRoutes,
    },
];
