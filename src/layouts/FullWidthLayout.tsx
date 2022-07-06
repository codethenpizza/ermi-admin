import {FC} from "react";
import {Outlet} from "react-router-dom";
import {Layout} from "@components";

export const FullWidthLayout: FC = () => (
    <Layout className='vh-100'>
        <Layout.Content>
            <Outlet/>
        </Layout.Content>
    </Layout>
);
