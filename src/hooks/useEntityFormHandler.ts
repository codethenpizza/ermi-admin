import {EntityFormParams} from "@components/entity/EntityForm";
import {BaseCrudService} from "@services";
import {Form, message} from "antd";
import {useState} from "react";
import {useEffectOnce} from "react-use";

export interface UseEntityFormHandlerParams extends Partial<EntityFormParams> {
    crudService: BaseCrudService;
    id?: number;
}

export const useEntityFormHandler = (params: UseEntityFormHandlerParams): EntityFormParams => {
    const {
        crudService,
        fields = [],
        onSubmit,
        id,
        onToggleMode,
        onCancelEdit,
    } = params;

    const [form] = Form.useForm();

    const [isEdit, setEdit] = useState<boolean>(Boolean(params.isEdit));
    const [initialData, setInitialData] = useState<any>({});

    const handleToggleMode = async () => {
        if (onToggleMode) {
            await onToggleMode();
        }
        const newEdit = !isEdit;
        if (!newEdit) {
            await handleCancelEdit();
        } else {
            setEdit(newEdit);
        }
    };

    const handleCancelEdit = async () => {
        if (onCancelEdit) {
            await onCancelEdit();
        }
        form.setFieldsValue(initialData);
        setEdit(false);
    }

    useEffectOnce(() => {
        setInitialData(form.getFieldsValue());
    });

    const handleSubmit = async (values: any) => {
        const key = 'handleSubmitMessage';
        try {
            if (onSubmit) {
                return await onSubmit(values);
            }

            if (id) {
                message.open({content: 'Обновление...', key, type: 'loading'});
                await crudService.updateItem(id, values);
                message.open({content: 'Обновление успешно', key, type: 'success'});
            } else {
                message.open({content: 'Создание...', key, type: 'loading'});
                await crudService.createItem(values);
                message.open({content: 'Создание успешно', key, type: 'success'});
            }

            setInitialData(values);
            setEdit(false);
        } catch (e: any) {
            message.open({content: 'Ошибка', key, type: 'error'});
            throw e;
        }
    }

    return {
        fields,
        form,
        isEdit,
        onSubmit: handleSubmit,
        onToggleMode: handleToggleMode,
        onCancelEdit: handleCancelEdit,
        ...params,
    }
};
