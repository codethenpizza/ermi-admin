import React, {FC, ReactNode} from "react";
import {AUTH_ROUTES, AVITO_ROUTES, AvitoTemplate, ColumnDataType, CustomTableProps} from "@types";
import {useTablePagination} from "@hooks";
import {Card} from "antd";
import {Table} from "@components";
import {avitoTemplateService} from "@services/AvitoService";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {composeRootTo} from "@utils";

export interface AvitoTemplateTableProps extends CustomTableProps<AvitoTemplate> {
    cardExtra?: ReactNode;
}

export const AvitoTemplateTable: FC<AvitoTemplateTableProps> = (props) => {
    const navigate = useNavigate();

    const handleRowClick = (item: AvitoTemplate) => {
        const id = item?.id?.toString() || '';
        navigate(composeRootTo(AUTH_ROUTES.AVITO, AVITO_ROUTES.TEMPLATES, id));
    }

    const {paginationProps} = useTablePagination<AvitoTemplate>({crudService: avitoTemplateService, ...props});

    const columns: ColumnDataType<AvitoTemplate>[] = [
        {
            title: '#',
            dataIndex: 'id',
        },
        {
            title: 'Заголовок',
            dataIndex: 'title',
        },
        {
            title: 'Описание',
            dataIndex: 'description',
        },
        {
            title: 'Категория',
            dataIndex: 'cat_id',
            render: (_, row) => row.productCat?.name,
        },
        {
            title: 'default',
            dataIndex: 'default',
            render: (isDefault: boolean) => isDefault ? <CheckCircleOutlined/> : <CloseCircleOutlined/>,
        },
    ];

    return (
        <Card title="Список шаблонов" extra={props.cardExtra}>
            <Table
                onRow={(item) => ({
                    onClick: () => handleRowClick(item),
                    ...(props?.onRow?.(item) || {}),
                })}
                {...paginationProps}
                columns={columns}
            />
        </Card>
    );
}
