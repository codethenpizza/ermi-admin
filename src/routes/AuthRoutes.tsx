import {VFC} from "react";
import {Routes, Route} from "react-router-dom";
import {LoginPage} from "@pages";

const AuthRoutes: VFC = () => (
    <Routes>
        <Route
            element={<LoginPage/>}
            path='/'
        />
    </Routes>
)

export {
    AuthRoutes
}
