import {FC} from "react";
import {Layout} from '@components'
import {Sidebar} from "@containers";
import {Outlet} from "react-router-dom";
import {Header} from "@components/header/Header";
import styles from './WithSidebarLayout.module.scss';


export const WithSidebarLayout: FC = () => (
    <Layout className='vh-100'>
        <Layout.Sider>
            <Sidebar/>
        </Layout.Sider>
        <Layout.Content>
            <Layout.Header>
                <Header/>
            </Layout.Header>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </Layout.Content>
    </Layout>
);
