import {EntityFormHookData} from "@hooks/useEntityForm";
import {useMemo} from "react";
import {Button, Space} from "antd";

export interface FormActionButtonsHookProps extends Pick<EntityFormHookData, 'onSubmit' | 'isEdit' | 'onCancelEdit' | 'onStartEdit' | 'onDelete'> {
    isNew: boolean;
}

export const useFormActionButtons = (props: FormActionButtonsHookProps) => {

    const {
        isNew,
        isEdit,
        onCancelEdit,
        onStartEdit,
        onSubmit,
        onDelete,
    } = props;

    return useMemo(() => {
        if (isEdit) {
            return <Space>
                {!isNew &&
                <Button
                    style={{backgroundColor: 'red', borderColor: 'red', color: 'white'}}
                    onClick={onDelete}
                >Удалить</Button>}
                <Button onClick={() => onSubmit()} type="primary">Сохранить</Button>
                <Button onClick={onCancelEdit}>Отменить</Button>
            </Space>;
        }
        return <Button onClick={onStartEdit}>Редактировать</Button>;
    }, [isEdit, onCancelEdit, onStartEdit, onSubmit, onDelete, isNew]);
}
