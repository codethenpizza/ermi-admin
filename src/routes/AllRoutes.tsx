import {VFC} from "react";
import {Routes, Route} from "react-router-dom";
import {AdminRoutes} from "./AdminRoutes";
import {AuthRoutes} from "./AuthRoutes";
import {composeRootTo} from 'utils/router-helpers'
import {AuthLayout, MainLayout} from "@layouts";
import {GUEST_ROUTES} from "@types";

const AllRoutes: VFC = () => (
    <Routes>
        <Route
            element={<AuthLayout><AuthRoutes/></AuthLayout>}
            path={composeRootTo(GUEST_ROUTES.LOGIN)}
        />
        <Route
            element={<MainLayout><AdminRoutes/></MainLayout>}
            path='*'
        />
    </Routes>
)

export {
    AllRoutes
}
