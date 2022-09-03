import {cloneElement, FC, isValidElement, ReactElement, ReactNode} from "react";
import {FormItemProps} from "antd/lib/form/FormItem";
import {Button, Col, Form, FormInstance, Input, Row, Space} from "antd";
import {EditOutlined} from "@ant-design/icons";
import clsx from "clsx";
import {FormLayout} from "antd/es/form/Form";

export interface EntityFormProps<T = any> {
    fields: FormItemProps<T>[];
    onSubmit?: () => void;
    onAfterSubmit?: () => void;
    onDelete?: () => void;
    isEdit?: boolean;
    form: FormInstance,
    onCancelEdit?: () => void;
    onStartEdit?: () => void;
    hideEditIcon?: boolean;
    className?: string;
    layout?: FormLayout;
    customEditIcon?: ReactElement;
    hideActionButtons?: boolean;
}


export const EntityForm: FC<EntityFormProps> = (params) => {

    const {
        fields,
        form,
        isEdit,
        hideEditIcon,
        onSubmit = () => {
        },
        onStartEdit = () => {
        },
        onCancelEdit = () => {
        },
        className,
        layout = 'horizontal',
        customEditIcon,
        hideActionButtons,
    } = params;

    const getFieldInput = (field: FormItemProps): ReactNode => {
        let child: ReactNode;
        if (typeof field.children === 'function') {
            child = field.children(form);
        } else {
            child = field.children;
        }

        if (isValidElement(child)) {
            // @ts-ignore
            return cloneElement(child, {disabled: !isEdit});
        }

        return <Input disabled={!isEdit}/>;
    }

    const editIcon = cloneElement(customEditIcon || <EditOutlined/>, {onClick: onStartEdit} );

    return (
        <div className={clsx(className)}>
            {!hideEditIcon && !isEdit &&
            <Row gutter={24} justify="end">
                <Col>
                    {editIcon}
                </Col>
            </Row>}
            <Form form={form} onFinish={() => onSubmit()} autoComplete="off" layout={layout}>
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
                    !hideActionButtons && isEdit &&
                    <Space>
                        <Button type="primary" htmlType="submit">Сохранить</Button>
                        <Button onClick={onCancelEdit} type="default" htmlType="button">Отмена</Button>
                    </Space>
                }
            </Form>
        </div>
    );
}
