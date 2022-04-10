import {FC} from "react";
import {Menu} from "antd";
import {useNavigate} from "react-router-dom";
import {composeTo} from "@utils";
import {AUTH_ROUTES} from "@types";

const Sidebar: FC = () => {
    const navigate = useNavigate()

    return (
        <Menu>
            <Menu.Item onClick={() => navigate(composeTo(AUTH_ROUTES.DASHBOARD))}>
                dashboard
            </Menu.Item>
        </Menu>
    )
}

export {
    Sidebar
}
