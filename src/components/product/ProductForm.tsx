import {FC} from "react";
import {Product} from "@types";
import {EntityForm, EntityFormParams} from "../entity/EntityForm";
import {useEntityFormHandler} from "@hooks/useEntityFormHandler";
import {productService} from "@services";

export interface ProductFormParams {
    product: Product;
}

export const ProductForm: FC<ProductFormParams> = ({product}) => {

    const fields: EntityFormParams['fields'] = [
        {
            name: 'name',
            initialValue: product.name,
            label: 'Наименование',
        },
        {
            name: 'desc',
            initialValue: product.desc,
            label: 'Описание',
        },
    ];

    const formProps = useEntityFormHandler({crudService: productService, fields, id: product.id})

    return (
        <EntityForm {...formProps} />
    );
}
