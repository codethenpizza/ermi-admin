import React from "react";
import {ATTR_TYPE, AttrValue} from "@types";
import {EntityForm, EntityFormParams} from "@components/entity/EntityForm";
import {useEntityFormHandler, UseEntityFormHandlerParams} from "@hooks/useEntityFormHandler";
import {attrValueService} from "@services/attr-value";
import {formatAttrName} from "../../utils/helpers";
import {Checkbox} from "antd";

export interface AttrValueFormProps extends Partial<UseEntityFormHandlerParams> {
    attrValue: AttrValue;
}

export const AttrValueForm: React.FC<AttrValueFormProps> = (props) => {
    const {attrValue} = props;

    const isBoolean = attrValue.attribute.type.name === ATTR_TYPE.BOOLEAN;

    const fields: EntityFormParams['fields'] = [
        {
            name: 'value',
            initialValue: isBoolean ? parseInt(attrValue.value) : attrValue.value,
            label: (<span>{formatAttrName(attrValue.attribute.name)}</span>),
            valuePropName: isBoolean ? 'checked' : undefined,
            children: isBoolean ? <Checkbox/> : undefined,
        },
    ];

    const formProps = useEntityFormHandler({...props, crudService: attrValueService, fields, id: attrValue.id})

    return (
        <EntityForm {...formProps} />
    );
}
