import {FC} from "react";
import {Menu} from "antd";
import {useMenu} from "./hooks/use-menu";
import {useNavigate} from 'react-router-dom'

export type SidebarMenuItem = {
  route: string
  name: string
}

const Sidebar: FC = () => {
  const menu = useMenu()
  const navigate = useNavigate()

  return (
    <Menu>
      {menu.map(({name, route}) => (
          <Menu.Item onClick={() => navigate(route)}>
            {name}
          </Menu.Item>
      ))}
    </Menu>
  )
}

export {
  Sidebar
}
