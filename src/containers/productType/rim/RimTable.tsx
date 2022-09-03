import {FC, useState} from "react";
import {
    AUTH_ROUTES,
    ColumnDataType,
    CustomTableProps,
} from "@types";
import {useTablePagination} from "@hooks";
import {Table} from "@components";
import {rimService} from "@services/ProductTypeService";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Rim} from "../../../types/productTypes";
import {useTableFiltersStore} from "../../../store/slices/tableFilters";
import {composeRootTo} from "@utils";
import {useNavigate} from "react-router-dom";
import {getRimFilterName} from "./rimFiltersHelper";
import {Button, Card, Image, message, Modal, Space} from "antd";
import styles from "./RimTable.module.css";
import {ProductVariantBulkImageCard} from "@containers/productVariantImage/ProductVariantBulkImageCard/ProductVariantBulkImageCard";
import ButtonGroup from "antd/es/button/button-group";
import {avitoAdService} from "@services/AvitoService";
import {useColumnSearchProps} from "@hooks/useColumnSearchProps";

export interface RimTableProps extends CustomTableProps<Rim> {
}

export const RimTable: FC<RimTableProps> = (props) => {

    const navigate = useNavigate();

    const handleRowClick = (item: Rim) => {
        navigate(composeRootTo(AUTH_ROUTES.PRODUCTS, item.product_id.toString(), 'variant', item.id.toString()));
    }

    const [selectedIds, setSelected] = useState<number[]>([]);

    const {getFilter} = useTableFiltersStore();

    const columns: ColumnDataType<Rim>[] = [
        {
            title: '#',
            dataIndex: 'id',
            sorter: true,
        },
        {
            title: 'product_id',
            dataIndex: 'product_id',
        },
        {
            title: 'Avito',
            dataIndex: 'avito_active',
            render: (active: boolean) => active ? <CheckCircleOutlined/> : <CloseCircleOutlined/>,
            filters: [{text: 'Активно', value: true}, {text: 'Не активно', value: false}],
        },
        {
            title: 'Изображение',
            dataIndex: 'productVariant',
            render: (productVariant: Rim['productVariant']) => <Image
                width={200}
                src={productVariant?.images?.find((x) => x?.ProductVariantImg?.position === 0)?.original_uri}
                preview={false}
            />
        },
        {
            title: 'brand',
            dataIndex: 'brand',
            filters: getFilter(getRimFilterName('brand')),
        },
        {
            title: 'model',
            dataIndex: 'model',
            ...useColumnSearchProps(),
        },
        {
            title: 'name',
            dataIndex: 'name',
        },
        {
            title: 'color',
            dataIndex: 'color',
            filters: getFilter(getRimFilterName('color')),
        },
        {
            title: 'dia',
            dataIndex: 'dia',
            filters: getFilter(getRimFilterName('dia')),
        },
        {
            title: 'et',
            dataIndex: 'et',
            filters: getFilter(getRimFilterName('et')),
        },
        {
            title: 'beadlock',
            dataIndex: 'beadlock',
            render: (beadlock: boolean) => beadlock ? <CheckCircleOutlined/> : <CloseCircleOutlined/>,
        },
        {
            title: 'width',
            dataIndex: 'width',
            filters: getFilter(getRimFilterName('width')),
        },
        {
            title: 'diameter',
            dataIndex: 'diameter',
            filters: getFilter(getRimFilterName('diameter')),
        },
        {
            title: 'bolts_count',
            dataIndex: 'bolts_count',
            filters: getFilter(getRimFilterName('bolts_count')),
        },
        {
            title: 'bolts_spacing',
            dataIndex: 'bolts_spacing',
            filters: getFilter(getRimFilterName('bolts_spacing')),
        },
        {
            title: 'pcd',
            dataIndex: 'pcd',
            filters: getFilter(getRimFilterName('pcd')),
        },
        {
            title: 'type',
            dataIndex: 'type',
            filters: getFilter(getRimFilterName('type')),
        },
    ];

    const {paginationProps, controlParams} = useTablePagination<Rim>({crudService: rimService, ...props});

    const openImageChooserModal = () => {
        const handleImagesSave = () => {
            controlParams.updateList().then(() => {
                modal.destroy();
            });
        }

        const modal = Modal.info({
            title: 'Изменение изображений',
            content: <ProductVariantBulkImageCard productVariantIds={selectedIds} onSave={handleImagesSave}/>,
            width: '80%',
            icon: null,
            maskClosable: true,
            okButtonProps: {hidden: true}
        });
    }

    const avitoSetStatus = async (status: boolean) => {
        try {
            await avitoAdService.setActive(selectedIds, status);
            await controlParams.updateList();
            await message.success('Успешно обновлено!');
        } catch (e) {
            console.error('avitoSetStatus error -', e);
            await message.error('Ошибка!');
        }
    }

    const actions = <Space>
        <ButtonGroup>
            <Button onClick={() => avitoSetStatus(true)}>Авито (включить)</Button>
            <Button onClick={() => avitoSetStatus(false)}>Авито (выключить)</Button>
        </ButtonGroup>
        <Button onClick={openImageChooserModal}>Назначить изображения</Button>
    </Space>

    return <Card title="Список дисков" extra={actions}>
        <div className={styles.tableWrapper}>
            <Table
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys) => setSelected(selectedRowKeys as number[]),
                }}
                tableLayout={'auto'}
                size={"small"}
                onRow={(item) => ({
                    onClick: () => handleRowClick(item),
                    ...(props?.onRow?.(item) || {}),
                })}
                {...paginationProps}
                columns={columns}
            />
        </div>
    </Card>
}
