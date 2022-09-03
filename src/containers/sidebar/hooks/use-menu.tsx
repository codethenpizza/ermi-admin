import {composeTo} from "@utils";
import {AUTH_ROUTES, AVITO_ROUTES, PRODUCT_TYPE_ROUTES} from "@types";
import {BarcodeOutlined, BarsOutlined, UserOutlined} from "@ant-design/icons";
import {ItemType} from "antd/lib/menu/hooks/useItems";
import {useNavigate} from "react-router-dom";

export const useMenu = (): ItemType[] => {
    const navigate = useNavigate()

    return [
        {
            key: 'Заказы',
            label: 'Заказы',
            onClick: () => navigate(composeTo(AUTH_ROUTES.ORDERS)),
            icon: <BarcodeOutlined />,
        },
        {
            key: 'Продукты',
            label: 'Продукты',
            onClick: () => navigate(composeTo(AUTH_ROUTES.PRODUCTS)),
            icon: <BarsOutlined />,
        },
        {
            key: 'Типы продуктов',
            label: 'Типы продуктов',
            icon: <BarsOutlined />,
            children: [
                {
                    key: 'Диски',
                    label: 'Диски',
                    onClick: () => navigate(composeTo(AUTH_ROUTES.PRODUCT_TYPES, PRODUCT_TYPE_ROUTES.RIMS)),
                    icon: <BarsOutlined />,
                },
                {
                    key: 'Шины',
                    label: 'Шины',
                    onClick: () => navigate(composeTo(AUTH_ROUTES.PRODUCT_TYPES, PRODUCT_TYPE_ROUTES.TIRES)),
                    icon: <BarsOutlined />,
                },
            ]
        },
        {
            key: 'Пользователи',
            label: 'Пользователи',
            onClick: () => navigate(composeTo(AUTH_ROUTES.USERS)),
            icon: <UserOutlined />,
        },
        {
            key: 'Авито',
            label: 'Авито',
            icon: <BarsOutlined />,
            children: [
                {
                    key: 'Объявления',
                    label: 'Объявления',
                    onClick: () => navigate(composeTo(AUTH_ROUTES.AVITO, AVITO_ROUTES.ADS)),
                    icon: <BarsOutlined />,
                },
                {
                    key: 'Шаблоны',
                    label: 'Шаблоны',
                    onClick: () => navigate(composeTo(AUTH_ROUTES.AVITO, AVITO_ROUTES.TEMPLATES)),
                    icon: <BarsOutlined />,
                },
            ]
        },
    ];
}
