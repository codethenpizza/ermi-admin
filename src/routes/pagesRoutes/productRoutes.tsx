import {RouteObject} from "react-router-dom";
import {ProductListPage} from "@pages/products/ProductListPage";
import {ProductSinglePage} from "@pages/products/ProductSinglePage";
import {ProductVariantSinglePage} from "@pages/product-variants/ProductVariantSinglePage";

export const productRoutes: RouteObject[] = [
    {
        index: true,
        element: <ProductListPage/>,
    },
    {
        path: ':id',
        element: <ProductSinglePage/>,
    },
    {
        path: ':productID/variant/:id',
        element: <ProductVariantSinglePage/>
    }
];
