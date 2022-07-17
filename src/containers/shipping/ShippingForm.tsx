import {FC, useState} from "react";
import {Shipping, ShippingType} from "@types";
import {EntityForm, EntityFormProps} from "@components/entity/EntityForm";
import {DatePicker, Select} from "antd";
import {EntityFormComponentProps, useEntityForm} from "@hooks/useEntityForm";
import {shippingService} from "@services/ShippingService";
import {useEffectOnce} from "react-use";
import {shippingTypeService} from "@services/ShippingTypeService";
import moment from "moment";

export interface ShippingFormProps extends EntityFormComponentProps<Shipping> {
    shipping: Shipping;
}

export const ShippingForm: FC<ShippingFormProps> = (props) => {

    const {
        shipping,
        onSubmit,
    } = props;

    const [shippingTypes, setShippingTypes] = useState<ShippingType[]>([]);

    useEffectOnce(() => {
        shippingTypeService.fetchList().then(x => {
            setShippingTypes(x.rows);
        })
    });

    const shippingStatusOptions = [
        {label: 'Не обработано', value: 'new'},
        {label: 'В процессе', value: 'in_progress'},
        {label: 'Выполнено', value: 'done'},
    ]

    const fields: EntityFormProps['fields'] = [
        {
            name: 'shipping_type_id',
            initialValue: shipping?.shipping_type_id,
            label: 'Тип доставки',
            children: <Select options={shippingTypes.map(x => ({label: x.name, value: x.id}))} />
        },
        {
            name: 'status',
            initialValue: shipping?.status,
            label: 'Статус доставки',
            children: <Select options={shippingStatusOptions} />
        },
        {
            name: 'comment',
            initialValue: shipping?.comment,
            label: 'Комментарий',
        },
        {
            name: 'delivery_date_from',
            initialValue: shipping?.delivery_date_from ? moment(shipping?.delivery_date_from) : null,
            label: 'Дата доставки от',
            children: <DatePicker showTime/>,
        },
        {
            name: 'delivery_date_to',
            initialValue: shipping?.delivery_date_to ? moment(shipping?.delivery_date_to) : null,
            label: 'Дата доставки до',
            children: <DatePicker showTime/>
        },
    ];

    const handleSubmit = (val: Partial<Shipping>) => {
        if (val?.delivery_date_from) {
            val.delivery_date_from = moment(val.delivery_date_from).toISOString() as unknown as Date;
        }

        if (val?.delivery_date_to) {
            val.delivery_date_to = moment(val.delivery_date_to).toISOString() as unknown as Date;
        }

        val.shippingType = shippingTypes.find(x => x.id === val.shipping_type_id);
        onSubmit?.(val);
    }

    const formProps = useEntityForm({
        ...props,
        crudService: shippingService,
        fields,
        id: shipping?.id,
        onSubmit: handleSubmit,
    });

    return (
        <EntityForm {...formProps} />
    );
}
