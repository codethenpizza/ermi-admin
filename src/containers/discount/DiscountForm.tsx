import {FC, useState} from "react";
import {Discount, DiscountType} from "@types";
import {EntityForm, EntityFormProps} from "@components/entity/EntityForm";
import {Select} from "antd";
import {useEffectOnce} from "react-use";
import {discountTypeService} from "@services/DiscountTypeService";
import {EntityFormComponentProps, useEntityForm} from "@hooks/useEntityForm";
import {shippingService} from "@services/ShippingService";

export interface DiscountFormProps extends EntityFormComponentProps<Discount> {
    discount?: Discount;
}

export const DiscountForm: FC<DiscountFormProps> = (props) => {

    const {discount} = props;

    const [discountTypes, setDiscountTypes] = useState<DiscountType[]>([]);

    useEffectOnce(() => {
        discountTypeService.fetchList().then(x => {
            setDiscountTypes(x.rows);
        })
    })

    const fields: EntityFormProps['fields'] = [
        {
            name: 'discount_type_id',
            initialValue: discount?.discount_type_id,
            label: 'Тип скидки',
            children: <Select options={discountTypes.map(x => ({label: x.name, value: x.id}))}/>
        },
        {
            name: 'value',
            initialValue: discount?.value,
            label: 'Значение',
        }
    ];

    const formProps = useEntityForm({
        crudService: shippingService,
        fields,
        id: discount?.id,
        ...props,
    });

    return (
        <EntityForm {...formProps} />
    );

}
