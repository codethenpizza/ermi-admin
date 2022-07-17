import {FC} from "react";
import {Invoice} from "@types";
import {EntityForm, EntityFormProps} from "@components/entity/EntityForm";
import {EntityFormComponentProps, useEntityForm} from "@hooks/useEntityForm";
import {productService} from "@services";

export interface InvoiceFormProps extends EntityFormComponentProps<Invoice> {
    invoice: Partial<Invoice>;
}

export const InvoiceForm: FC<InvoiceFormProps> = (props) => {

    const {invoice} = props;

    const fields: EntityFormProps['fields'] = [
        {
            name: 'desc',
            initialValue: invoice.desc,
            label: 'Описание',
        },
        {
            name: 'value',
            initialValue: invoice.value,
            label: 'Сумма',
        },
    ];

    const formProps = useEntityForm({...props, crudService: productService, fields, id: invoice.id})

    return (
        <EntityForm
            {...formProps}
        />
    );
}
