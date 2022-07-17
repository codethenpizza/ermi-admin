import {FC} from "react";
import {EntityFormComponentProps, useEntityForm} from "@hooks/useEntityForm";
import {Address} from "@types";
import {EntityForm, EntityFormProps} from "@components/entity/EntityForm";
import {addressService} from "@services/AddressService";

export interface AddressFormProps extends EntityFormComponentProps<Address> {
    address?: Partial<Address>;
}

export const AddressForm: FC<AddressFormProps> = (props) => {

    const {address} = props;

    const fields: EntityFormProps['fields'] = [
        {
            name: 'region',
            initialValue: address?.region,
            label: 'Регион',
        },
        {
            name: 'city',
            initialValue: address?.city,
            label: 'Город',
        },
        {
            name: 'street',
            initialValue: address?.street,
            label: 'Улица',
        },
        {
            name: 'house',
            initialValue: address?.house,
            label: 'Дом',
        },
        {
            name: 'comment',
            initialValue: address?.comment,
            label: 'Комментарий',
        },
    ];

    const formProps = useEntityForm({...props, crudService: addressService, fields, id: address?.id})

    return (
        <EntityForm layout="vertical" {...formProps} />
    );
}
