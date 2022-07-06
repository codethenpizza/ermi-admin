import {RouteObject} from "react-router-dom";
import {LoginPage} from "@pages";

export const publicRoutes: RouteObject[] = [
    {
        index: true,
        element: <LoginPage/>,
    }
]
