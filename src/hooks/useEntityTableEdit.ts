import {DEFAULT_ROW_KEY, UsePaginationParams} from "@hooks/useTablePagination";
import {cloneElement, isValidElement, Key, ReactNode, useEffect, useState} from "react";
import {Modal, ModalFuncProps} from "antd";
import {TableRowSelection} from "antd/lib/table/interface";
import {GetRowKey} from "rc-table/lib/interface";
import {useTableActionButtons} from "@hooks/useTableActionButtons";

export interface AddEntitiesToTableParams<T = any> {
    addItem?: (item: Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>) => void;
}


export interface EntityTableEditParams<T> extends Pick<UsePaginationParams<T>, 'list' | 'rowKey'> {
    addModalParams?: ModalFuncProps & AddEntitiesToTableParams;
    isEditable?: boolean;
    onListChange?: (list: any[]) => void;
    onListEditCancel?: () => void;
    hideDeleteButton?: boolean;
}

export interface EntityTableEditResult<T> {
    actionButtons: ReactNode;
    list: T[];
    handleSelect: TableRowSelection<T>['onChange'];
    updateListItem: (item: T, getRowKeyFn?: GetRowKey<T>) => void;
}

export const useEntityTableEdit = <T = any>(params: EntityTableEditParams<T>): EntityTableEditResult<T> => {

    const {
        list: initialList = [],
        onListChange = () => {
        },
        onListEditCancel = () => {
        },
        rowKey = DEFAULT_ROW_KEY,
        addModalParams,
        hideDeleteButton,
    } = params;

    const [isEditable, setIsEditable] = useState<boolean>(Boolean(params.isEditable));
    const [list, setList] = useState<any[]>(initialList);
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

    useEffect(() => {
        setIsEditable(Boolean(params.isEditable));
    }, [params.isEditable])

    useEffect(() => {
        setList(initialList);
    }, [setList]);

    useEffect(() => {
        onListChange(list);
    }, [list]);

    const handleCancel = () => {
        setList(initialList);
        setIsEditable(false);
        onListEditCancel();
    }

    const handleRemove = () => {
        setList((state) => state.filter((item) => {

            if (typeof rowKey === 'function') {
                const key = rowKey(item);
                return !selectedKeys.includes(key);
            }

            return !selectedKeys.includes(item[rowKey]);
        }));
        setSelectedKeys([]);
    }

    const handleAdd = () => {
        if (addModalParams) {
            const modal = Modal.info({
                ...addModalParams,
                content: isValidElement(addModalParams.content) ? cloneElement<AddEntitiesToTableParams>(
                    addModalParams.content,
                    {
                        addItem: (item) => {
                            addModalParams.addItem?.(item);
                            setList((state) => ([...state, item]));
                            modal.destroy();
                        }
                    },
                    null
                ) : addModalParams.content,
            })
        }
    }

    const actionButtons = useTableActionButtons({
        isEditable,
        setIsEditable,
        handleAdd,
        handleCancel,
        addModalParams,
        handleRemove,
        hideDeleteButton,
    })

    const handleSelect: TableRowSelection<any>['onChange'] = (keys) => {
        setSelectedKeys(keys);
    }

    // @ts-ignore
    const updateListItem = (item, getRowKeyFn = rowKey) => {
        let itemKey: string | number;

        if (typeof getRowKeyFn === 'function') {
            itemKey = getRowKeyFn(item);
        } else {
            itemKey = item[getRowKeyFn];
        }

        setList((state) => state.map((x) => {

            if (typeof getRowKeyFn === 'function') {
                if (itemKey === getRowKeyFn(x)) {
                    return item;
                }
            } else if (itemKey === x[getRowKeyFn]) {
                return item;
            }

            return x;
        }))
    }

    return {
        actionButtons,
        list,
        handleSelect,
        updateListItem,
    };
}
