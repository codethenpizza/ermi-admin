import {FC} from "react";
import {Product} from "@types";
import {EntityForm, EntityFormProps} from "@components/entity/EntityForm";
import {EntityFormComponentProps, useEntityForm} from "@hooks/useEntityForm";
import {productService} from "@services";

export interface ProductFormProps extends EntityFormComponentProps<Product> {
    product: Product;
}

export const ProductForm: FC<ProductFormProps> = (props) => {

    const {product} = props;

    const fields: EntityFormProps['fields'] = [
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

    const formProps = useEntityForm({...props, crudService: productService, fields, id: product.id})

    return (
        <EntityForm {...formProps} />
    );
}
