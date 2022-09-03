import {FC, useState} from "react";
import {
    AUTH_ROUTES,
    ColumnDataType,
    CustomTableProps,
} from "@types";
import {useTablePagination} from "@hooks";
import {Table} from "@components";
import {tireService} from "@services/ProductTypeService";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Tire} from "../../../types/productTypes";
import {useTableFiltersStore} from "../../../store/slices/tableFilters";
import {composeRootTo} from "@utils";
import {useNavigate} from "react-router-dom";
import {getTireFilterName} from "./tireFiltersHelper";
import {Button, Card, Image, Modal, Space} from "antd";
import styles from "./TireTable.module.css";
import {ProductVariantBulkImageCard} from "@containers/productVariantImage/ProductVariantBulkImageCard/ProductVariantBulkImageCard";

export interface TireTableProps extends CustomTableProps<Tire> {
}

export const TireTable: FC<TireTableProps> = (props) => {

    const navigate = useNavigate();

    const handleRowClick = (item: Tire) => {
        navigate(composeRootTo(AUTH_ROUTES.PRODUCTS, item.product_id.toString(), 'variant', item.id.toString()));
    }

    const [selectedIds, setSelected] = useState<number[]>([]);

    const {getFilter} = useTableFiltersStore();

    const columns: ColumnDataType<Tire>[] = [
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
            dataIndex: ['productVariant', 'avitoAd', 'active'],
            render: (active: boolean) => active ? <CheckCircleOutlined/> : <CloseCircleOutlined/>,
            filters: [{text: 'Активно', value: true}, {text: 'Не активно', value: false}],
        },
        {
            title: 'Изображение',
            dataIndex: 'productVariant',
            render: (productVariant: Tire['productVariant']) => <Image
                width={200}
                src={productVariant?.images?.find((x) => x?.ProductVariantImg?.position === 0)?.original_uri}
                preview={false}
            />
        },
        {
            title: 'brand',
            dataIndex: 'brand',
            filters: getFilter(getTireFilterName('brand')),
        },
        {
            title: 'model',
            dataIndex: 'model',
        },
        {
            title: 'name',
            dataIndex: 'name',
        },
        {
            title: 'width',
            dataIndex: 'width',
            filters: getFilter(getTireFilterName('width')),
        },
        {
            title: 'profile',
            dataIndex: 'profile',
            filters: getFilter(getTireFilterName('profile')),
        },
        {
            title: 'diameter',
            dataIndex: 'diameter',
            filters: getFilter(getTireFilterName('diameter')),
        },
        {
            title: 'season',
            dataIndex: 'season',
            filters: getFilter(getTireFilterName('season')),
        },
        {
            title: 'speed',
            dataIndex: 'speed',
            filters: getFilter(getTireFilterName('speed')),
        },
        {
            title: 'load',
            dataIndex: 'load',
            filters: getFilter(getTireFilterName('load')),
        },
        {
            title: 'runflat',
            dataIndex: 'runflat',
            render: (runflat: string) => parseInt(runflat) ? <CheckCircleOutlined/> : <CloseCircleOutlined/>,
        },
        {
            title: 'pin',
            dataIndex: 'pin',
            render: (pin: string) => parseInt(pin) ? <CheckCircleOutlined/> : <CloseCircleOutlined/>,
        },
    ];

    const {paginationProps, controlParams} = useTablePagination<Tire>({crudService: tireService, ...props});

    const openImageChooserModal = () => {
        const handleImagesSave = () => {
            controlParams.updateList().then(() => {
                modal.destroy();
            });
        }

        const modal = Modal.info({
            title: 'Изменение изображений',
            content: <ProductVariantBulkImageCard productVariantIds={selectedIds} onSave={handleImagesSave} />,
            width: '80%',
            icon: null,
            maskClosable: true,
            okButtonProps: {hidden: true}
        });
    }

    const actions = <Space>
        <Button onClick={openImageChooserModal}>Назначить изображения</Button>
    </Space>

    return <Card title="Список шин" extra={actions}>
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
