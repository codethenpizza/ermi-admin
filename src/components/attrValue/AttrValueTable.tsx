import {FC} from "react";
import {ATTR_TYPE, AttrValue, ColumnDataType, CustomTableParams} from "@types";
import {useTablePagination} from "@hooks";
import {Table} from "@components";
import {Checkbox, Modal} from "antd";
import {attrValueService} from "@services/attr-value";
import {AttrValueForm} from "@components/attrValue/AttrValueForm";
import {formatAttrName} from "../../utils/helpers";

export interface AttrValueTableParams extends CustomTableParams<AttrValue> {
}

export const AttrValueTable: FC<AttrValueTableParams> = (props) => {

    // const navigate = useNavigate();

    const handleRowClick = (item: AttrValue) => {
        const modal = Modal.info({
            title: 'Редактирование значения атрибута',
            content: <AttrValueForm
                attrValue={item}
                isEdit={true}
                showEditIcon={false}
                onAfterSubmit={async () => {
                    await controlParams.updateList();
                    modal.destroy()
                }}
                onCancelEdit={() => modal.destroy()}
            />,
            icon: null,
            maskClosable: true,
            okButtonProps: {hidden: true}
        })
    }

    const columns: ColumnDataType<AttrValue>[] = [
        {
            title: 'Наименование',
            dataIndex: 'attribute',
            render: (value, record) => formatAttrName(record.attribute.name),
        },
        {
            title: 'Значение',
            dataIndex: "value",
            render: (val, row) => {

                if (row.attribute.type.name === ATTR_TYPE.BOOLEAN) {
                    const int = parseInt(val);
                    if (!isNaN(int)) {
                        return <Checkbox checked={Boolean(int)} disabled />;
                    }
                }

                return val;
            }
        },
    ];

    const {paginationProps, controlParams} = useTablePagination<AttrValue>({crudService: attrValueService, ...props});

    return <Table
        size="small"
        {...paginationProps}
        onRow={(item) => ({
            onClick: () => handleRowClick(item),
            ...(props?.onRow?.(item) || {}),
        })}
        columns={columns}
    />
}
