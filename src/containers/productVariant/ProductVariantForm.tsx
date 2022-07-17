import {ProductVariant} from "@types";
import {FC} from "react";
import {EntityForm, EntityFormProps} from "@components/entity/EntityForm";
import {EntityFormComponentProps, useEntityForm} from "@hooks/useEntityForm";
import {productVariantService} from "@services/productVariant";
import {Switch} from "antd";

export interface ProductVariantFormProps extends EntityFormComponentProps<ProductVariant> {
    productVariant?: ProductVariant;
}

export const ProductVariantForm: FC<ProductVariantFormProps> = (props) => {
    const {productVariant} = props;

    const fields: EntityFormProps['fields'] = [
        {
            name: 'name',
            initialValue: productVariant?.name,
            label: 'Название',
        },
        {
            name: 'desc',
            initialValue: productVariant?.desc,
            label: 'Описание',
        },
        {
            name: 'is_available',
            label: 'Доступность',
            initialValue: productVariant?.is_available,
            valuePropName: 'checked',
            children: <Switch/>
        }
    ];

    const formProps = useEntityForm({...props, crudService: productVariantService, fields, id: productVariant?.id})

    return (
        <EntityForm {...formProps} />
    );
}
