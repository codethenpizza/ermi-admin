import {FC} from "react";
import {Navigate} from "react-router-dom";
import {Layout} from "@components";
import {useAuthStore} from "@store";
import {AUTH_ROUTES} from "@types";
import {composeRootTo} from "@utils";

const AuthLayout: FC = ({children}) => {
    const isAuthenticated = useAuthStore(state => !!state.user?.id)

    if (isAuthenticated) {
        return (
            <Navigate to={composeRootTo(AUTH_ROUTES.DASHBOARD)}/>
        )
    }

    return (
        <Layout className='vh-100'>
            <Layout.Content>
                {children}
            </Layout.Content>
        </Layout>
    )
}

export {
    AuthLayout
}
