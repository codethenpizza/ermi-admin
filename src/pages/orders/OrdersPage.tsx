import {FC} from "react";
import {OrderTable} from "@components";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {composeRootTo} from "@utils";
import {AUTH_ROUTES} from "@types";

export const OrdersPage: FC = () => {

    const navigate = useNavigate();

    const handleCreateButtonClick = () => {
        navigate(composeRootTo(AUTH_ROUTES.ORDERS, 'create'))
    }


    return (
        <OrderTable
            extraActions={
                <Button onClick={handleCreateButtonClick}>
                    Создать
                </Button>
            }
        />
    )
}
