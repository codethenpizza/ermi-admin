import {FC} from "react";
import {ProductTable} from "@components";
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTES, Product} from "@types";
import {composeRootTo} from "@utils";

export const ProductListPage: FC = () => {

    const navigate = useNavigate();

    const handleRowClick = (item: Product) => {
        navigate(composeRootTo(AUTH_ROUTES.PRODUCTS, item.id.toString()))
    }

    return (
        <ProductTable
            onRow={(item) => ({
                onClick: () => handleRowClick(item),
            })}
        />
    );
}
