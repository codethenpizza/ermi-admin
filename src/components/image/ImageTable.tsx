import React from "react";
import {useTablePagination} from "@hooks";
import {ColumnDataType, CustomTableParams, IImage} from "@types";
import {imageService} from "@services/images";
import {Table} from "@components";
import {Image} from "antd";
import {useColumnSearchProps} from "@hooks/useColumnSearchProps";

export interface ImageTableProps extends CustomTableParams<IImage> {
}

export const ImageTable: React.FC<ImageTableProps> = (params) => {

    const {paginationProps} = useTablePagination<IImage>({crudService: imageService, ...params});

    const columns: ColumnDataType<IImage>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            ...useColumnSearchProps(),
        },
        {
            title: '',
            dataIndex: 'original_uri',
            render: (src) => <Image
                src={src}
                preview={false}
                width={300}
            />
        },
    ];

    return <Table
        size="small"
        onRow={(item) => ({
            ...(params?.onRow?.(item) || {}),
        })}
        {...paginationProps}
        columns={columns}
    />
}
