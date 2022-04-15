import {FC} from "react";
import {Menu} from "antd";
import {useMenu} from "./hooks/use-menu";
import {Link} from 'react-router-dom'

export type SidebarMenuItem = {
    route: string
    name: string
}

const Sidebar: FC = () => {
    const menu = useMenu()

    return (
        <Menu>
            {menu.map(({name, route}) => (
                <Link to={route} key={route}>
                    <Menu.Item >
                        {name}
                    </Menu.Item>
                </Link>
            ))}
        </Menu>
    )
}

export {
    Sidebar
}
