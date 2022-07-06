import {FC, ReactNode} from "react";
import {Menu} from "antd";
import {useMenu} from "./hooks/use-menu";

export type SidebarMenuItem = {
  route: string
  name: string
  icon?: ReactNode
}

const Sidebar: FC = () => {
  const menu = useMenu()

  return (
    <Menu theme="dark" items={menu} mode="inline" />
  )
}

export {
  Sidebar
}
