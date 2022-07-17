import React, {useMemo} from "react";
import {Button, Space} from "antd";
import {EntityTableEditParams} from "@hooks/useEntityTableEdit";

export interface TableActionButtonsHookProps extends Pick<EntityTableEditParams<any>, 'addModalParams' | 'isEditable' | 'hideDeleteButton'> {
    setIsEditable: (state: boolean) => void;
    handleAdd: () => void;
    handleRemove: () => void;
    handleCancel: () => void;
}

export const useTableActionButtons = (props: TableActionButtonsHookProps) => {

    const {
        isEditable,
        setIsEditable,
        addModalParams,
        handleAdd,
        handleRemove,
        handleCancel,
        hideDeleteButton,
    } = props;

    const isExternalControl = isEditable !== undefined;

    return useMemo(() => {
        const editBtn = <Button onClick={() => setIsEditable(true)}>Редактировать</Button>;

        const addBtn = <Button onClick={handleAdd}>Добавить</Button>;
        const removeBtn = <Button onClick={handleRemove}>Удалить</Button>;
        const saveBtn = <Button>Сохранить</Button>;
        const cancelBtn = <Button onClick={handleCancel}>Отменить</Button>;

        return isEditable ?
            <Space>
                {addModalParams && addBtn}
                {!hideDeleteButton && removeBtn}
                {isExternalControl ? null : saveBtn}
                {isExternalControl ? null : cancelBtn}
            </Space> :
            isExternalControl ? null : <Space>{editBtn}</Space>
    }, [isEditable, setIsEditable, addModalParams, handleAdd, handleRemove, handleCancel, hideDeleteButton, isExternalControl]);
}
