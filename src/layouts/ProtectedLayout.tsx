import {FC, PropsWithChildren} from "react";
import {useAuthStore} from "@store";
import {Navigate} from "react-router-dom";
import {composeRootTo} from "@utils";
import {GUEST_ROUTES} from "@types";

export const ProtectedLayout: FC<PropsWithChildren<{}>> = ({children}) => {
    const isAuthenticated = useAuthStore(state => state.isAuth());

    if (!isAuthenticated) {
        return (
            <Navigate to={composeRootTo(GUEST_ROUTES.LOGIN)}/>
        )
    }

    return <>{children}</>;
}
