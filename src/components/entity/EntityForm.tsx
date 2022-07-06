import {cloneElement, FC, isValidElement, ReactNode} from "react";
import {FormItemProps} from "antd/lib/form/FormItem";
import {Button, Col, Form, FormInstance, Input, Row, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";
import clsx from "clsx";
import {FormLayout} from "antd/es/form/Form";

export interface EntityFormParams<T = any> {
    fields: FormItemProps<T>[],
    onSubmit?: (values: any) => void | Promise<void>,
    onAfterSubmit?: (values: any) => void,
    isEdit?: boolean,
    form: FormInstance,
    onToggleMode?: () => void,
    onCancelEdit?: () => void,
    showEditIcon?: boolean;
    className?: string;
    layout?: FormLayout;
}


export const EntityForm: FC<EntityFormParams> = (params) => {

    const {
        fields,
        form,
        isEdit,
        showEditIcon = true,
        onSubmit = () => {
        },
        onAfterSubmit = () => {},
        onToggleMode = () => {
        },
        onCancelEdit = () => {
        },
        className,
        layout = 'horizontal',
    } = params;

    const handleSubmit = async (values: any) => {
        await onSubmit(values);
        await onAfterSubmit(values);
    }

    const getFieldInput = (field: FormItemProps): ReactNode => {
        let child: ReactNode;
        if (typeof field.children === 'function') {
            child = field.children(form);
        } else {
            child = field.children;
        }

        if (isValidElement(child)) {
            return cloneElement(child, {disabled: !isEdit});
        }

        return <Input disabled={!isEdit}/>;
    }

    return (
        <div className={clsx(className)}>
            {showEditIcon && !isEdit &&
            <Row gutter={24} justify="end">
                <EditOutlined onClick={onToggleMode}/>
            </Row>}
            <Form form={form} onFinish={handleSubmit} autoComplete="off" layout={layout}>
                <Row gutter={24}>
                    {fields.map((field) => (
                        <Col key={field.name!.toString()}>
                            <Form.Item
                                {...field}
                            >
                                {getFieldInput(field)}
                            </Form.Item>
                        </Col>
                    ))}
                </Row>
                {
                    isEdit &&
                    <Space>
                        <Button type="primary" htmlType="submit">Сохранить</Button>
                        <Button onClick={onCancelEdit} type="default" htmlType="button">Отмена</Button>
                    </Space>
                }
            </Form>
        </div>
    );
}
