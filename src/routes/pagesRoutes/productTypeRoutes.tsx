import {RouteObject} from "react-router-dom";
import {PRODUCT_TYPE_ROUTES} from "@types";
import {RimListPage} from "@pages/productTypes/rim/RimListPage";
import {TireListPage} from "@pages/productTypes/tire/TireListPage";

export const productTypeRoutes: RouteObject[] = [
    {
        path: PRODUCT_TYPE_ROUTES.RIMS,
        element: <RimListPage/>,
    },
    {
        path: PRODUCT_TYPE_ROUTES.TIRES,
        element: <TireListPage/>,
    },
];
