import {FC} from "react";
import {Layout} from '@components'
import {Sidebar} from "@containers";
import {Navigate} from "react-router-dom";
import {useAuthStore} from "@store";
import {composeRootTo} from "@utils";
import {GUEST_ROUTES} from "@types";

const MainLayout: FC = ({children}) => {
    const isAuthenticated = useAuthStore(state => state.tokens.authToken)

    if (!isAuthenticated) {
        return (
            <Navigate to={composeRootTo(GUEST_ROUTES.LOGIN)}/>
        )
    }

    return (
        <Layout className='vh-100'>
            <Layout.Sider>
                <Sidebar/>
            </Layout.Sider>
            <Layout.Content>
                {children}
            </Layout.Content>
        </Layout>
    )
}

export {
    MainLayout
}
