import {FC, useEffect, useMemo} from "react";
import {AvitoTemplate} from "@types";
import {Button, Card, Form, Input, Select} from "antd";
import {useTableFiltersStore} from "../../../store/slices/tableFilters";
import {AvitoTemplateTagList} from "@pages/avito/template/AvitoTemplateTagList";

export interface AvitoTemplateFormProps {
    template?: Partial<AvitoTemplate>;
    onSubmit?: (val: Partial<AvitoTemplate>) => void;
}

export const AvitoTemplateForm: FC<AvitoTemplateFormProps> = (props) => {

    const {
        template,
        onSubmit = () => {},
    } = props;

    const [form] = Form.useForm();

    const {getFilter} = useTableFiltersStore();

    const cats = getFilter('cat_id');

    const catOptions = useMemo(() =>
            getFilter('cat_id').map(x => ({label: x.text, value: x.value})),
        [cats]
    );

    const onCatChange = (cat_id: number) => {
        form.setFieldsValue({cat_id});
    }

    useEffect(() => {
        form.setFieldsValue(template);
    }, [template]);

    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <Form
                style={{flexGrow: 1}}
                form={form}
                layout={'vertical'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
                onFinish={onSubmit}
            >
                <Form.Item
                    label="Категория"
                    name="cat_id"
                    rules={[{required: true, message: 'Обязательное поле!'}]}
                >
                    <Select options={catOptions} onChange={onCatChange}/>
                </Form.Item>
                <Form.Item
                    label="Заголовок"
                    name="title"
                    rules={[{required: true, message: 'Обязательное поле!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Описание"
                    name="description"
                    rules={[{required: true, message: 'Обязательное поле!'}]}
                >
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
            <AvitoTemplateTagList />
        </div>
    );
}
