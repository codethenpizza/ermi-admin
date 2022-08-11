import {EntityFormProps} from "@components/entity/EntityForm";
import {BaseCrudService} from "@services";
import {Form, message} from "antd";
import {ReactElement, useState} from "react";
import {useEffectOnce} from "react-use";
import {useFormActionButtons} from "@hooks/useFormActionButtons";

export interface EntityFormComponentProps<T = any> extends Omit<EntityFormHookProps<T>, 'crudService'> {
}

export interface EntityFormHookProps<T = any> extends Partial<Omit<EntityFormProps<T>, 'onSubmit' | 'onAfterSubmit'>> {
    crudService: BaseCrudService;
    id?: number;
    onSubmit?: (val: Partial<T>) => void;
    onAfterSubmit?: (val: Partial<T>) => void;
}

export interface EntityFormHookData<T = any> extends EntityFormProps<T> {
    onSubmit: () => void;
    onAfterSubmit: () => void;
    actionButtons: ReactElement;
}

export const useEntityForm = <T>(props: EntityFormHookProps<T>): EntityFormHookData<T> => {
    const {
        crudService,
        fields = [],
        onSubmit,
        onAfterSubmit,
        id,
        onCancelEdit,
    } = props;

    const [form] = Form.useForm();

    const [isEdit, setEdit] = useState<boolean>(Boolean(props.isEdit));
    const [initialData, setInitialData] = useState<any>({});

    useEffectOnce(() => {
        setInitialData(form.getFieldsValue());
    });

    const handleEditStateChange = (state: boolean) => {
        if (!state) {
            onCancelEdit?.();
            form.setFieldsValue(initialData);
        }

        setEdit(state);
    }

    const handleSubmit = async () => {
        const key = 'handleSubmitMessage';
        try {
            const values = form.getFieldsValue();

            if (onSubmit) {
                await onSubmit(values);
            } else {
                if (id) {
                    message.open({content: 'Обновление...', key, type: 'loading'});
                    await crudService.updateItem(id, values);
                    message.open({content: 'Обновление успешно', key, type: 'success'});
                } else {
                    message.open({content: 'Создание...', key, type: 'loading'});
                    await crudService.createItem(values);
                    message.open({content: 'Создание успешно', key, type: 'success'});
                }
            }

            await handleAfterSubmit();
            setInitialData((state: any) => ({...state, ...values}));
            setEdit(false);
        } catch (e: any) {
            message.open({content: 'Ошибка', key, type: 'error'});
            throw e;
        }
    }

    const handleAfterSubmit = async () => {
        const values = form.getFieldsValue();
        await onAfterSubmit?.(values);
    }

    const data: Omit<EntityFormHookData<T>, 'actionButtons'> =  {
        ...props,
        fields,
        form,
        isEdit,
        onSubmit: handleSubmit,
        onAfterSubmit: handleAfterSubmit,
        onStartEdit: () => handleEditStateChange(true),
        onCancelEdit: () => handleEditStateChange(false),
        onDelete: () => {},
    };

    const actionButtons = useFormActionButtons({...data, isNew: id === undefined});

    return {
        ...data,
        actionButtons,
    };
};
