import {Outlet, RouteObject} from "react-router-dom";
import {composeTo} from "@utils";
import {AUTH_ROUTES} from "@types";
import {OrdersPage} from "@pages";
import {productRoutes} from "./pagesRoutes/productRoutes";
import {UserListPage} from "@pages/users/UserListPage";
import {productTypeRoutes} from "./pagesRoutes/productTypeRoutes";


export const protectedRoutes: RouteObject[] = [
    {
        index: true,
        element: <h1>dashboard</h1>,
    },
    {
        path: composeTo(AUTH_ROUTES.ORDERS),
        element: <OrdersPage/>,
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
    }
];
