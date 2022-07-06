import {FC} from "react";
import {useRoutes} from "react-router-dom";
import {protectedRoutes} from "./protectedRoutes";
import {composeTo} from 'utils/router-helpers'
import {GUEST_ROUTES} from "@types";
import {publicRoutes} from "./publicRoutes";
import {App} from "../app/App";
import {ProtectedLayout} from "@layouts/ProtectedLayout";
import {WithSidebarLayout} from "@layouts/WithSidebarLayout/WithSidebarLayout";
import {FullWidthLayout} from "@layouts/FullWidthLayout";

export const AppRoutes: FC = () => useRoutes([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: 'qwe',
                element: <h1>QWE</h1>
            },
            {
                path: composeTo(GUEST_ROUTES.LOGIN),
                element: <FullWidthLayout/>,
                children: publicRoutes,
            },
            {
                path: "*",
                element: <ProtectedLayout>
                    <WithSidebarLayout/>
                </ProtectedLayout>,
                children: protectedRoutes,
            }
        ]
    }
]);
