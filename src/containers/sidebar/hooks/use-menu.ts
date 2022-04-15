import {SidebarMenuItem} from "@containers";
import {composeTo} from "@utils";
import {AUTH_ROUTES} from "@types";

export const useMenu = (): SidebarMenuItem[] => [
    {
        name: 'orders',
        route: composeTo(AUTH_ROUTES.ORDERS)
    }
]
