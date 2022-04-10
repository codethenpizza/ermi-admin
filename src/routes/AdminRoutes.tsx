import {VFC} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {composeTo} from "@utils";
import {AUTH_ROUTES} from "@types";

const AdminRoutes: VFC = () => (
    <Routes>
        <Route
            element={<Navigate to={AUTH_ROUTES.DASHBOARD}/>}
            path='/'
        />
        <Route
            element={<h1>dashboard</h1>}
            path={composeTo(AUTH_ROUTES.DASHBOARD)}
        />
    </Routes>
)

export {
    AdminRoutes
}
