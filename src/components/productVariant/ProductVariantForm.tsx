import {ProductVariant} from "@types";
import {FC} from "react";
import {EntityForm, EntityFormParams} from "@components/entity/EntityForm";
import {useEntityFormHandler} from "@hooks/useEntityFormHandler";
import {productVariantService} from "@services/productVariant";
import {Switch} from "antd";

export interface ProductVariantFormParams {
    productVariant?: ProductVariant;
}

export const ProductVariantForm: FC<ProductVariantFormParams> = (params) => {
    const {productVariant} = params;

    const fields: EntityFormParams['fields'] = [
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

    const formProps = useEntityFormHandler({crudService: productVariantService, fields, id: productVariant?.id})

    return (
        <EntityForm {...formProps} />
    );
}
