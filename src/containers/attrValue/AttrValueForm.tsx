import React from "react";
import {ATTR_TYPE, AttrValue} from "@types";
import {EntityForm, EntityFormProps} from "@components/entity/EntityForm";
import {useEntityForm, EntityFormComponentProps} from "@hooks/useEntityForm";
import {attrValueService} from "@services/attr-value";
import {formatAttrName} from "../../utils/helpers";
import {Checkbox} from "antd";

export interface AttrValueFormProps extends EntityFormComponentProps<AttrValue> {
    attrValue: AttrValue;
}

export const AttrValueForm: React.FC<AttrValueFormProps> = (props) => {
    const {attrValue} = props;

    const isBoolean = attrValue.attribute.type.name === ATTR_TYPE.BOOLEAN;

    const fields: EntityFormProps['fields'] = [
        {
            name: 'value',
            initialValue: isBoolean ? parseInt(attrValue.value) : attrValue.value,
            label: (<span>{formatAttrName(attrValue.attribute.name)}</span>),
            valuePropName: isBoolean ? 'checked' : undefined,
            children: isBoolean ? <Checkbox/> : undefined,
        },
    ];

    const formProps = useEntityForm({...props, crudService: attrValueService, fields, id: attrValue.id})

    return (
        <EntityForm {...formProps} />
    );
}
