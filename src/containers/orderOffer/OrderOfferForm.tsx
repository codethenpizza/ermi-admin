import {FC} from "react";
import {Offer, OrderOffer, ProductVariant} from "@types";
import {Button, Form, Input} from "antd";
import {useEffectOnce} from "react-use";
import {EntityFormComponentProps} from "@hooks/useEntityForm";

export interface OrderOfferFormProps extends EntityFormComponentProps<OrderOffer> {
    orderOffer?: OrderOffer;
    offer?: Offer;
    productVariant?: ProductVariant;
}

export const OrderOfferForm: FC<OrderOfferFormProps> = (props) => {

    const {
        orderOffer,
        offer,
        productVariant,
        onSubmit = () => {
        },
    } = props;

    const isNew = !Boolean(orderOffer);

    const [form] = Form.useForm<Partial<OrderOffer>>();

    const qty = Form.useWatch('qty', form);
    const vendorName = (orderOffer?.offer || offer)?.vendor?.name;

    const isValid = Boolean(qty);


    useEffectOnce(() => {
        if (!isNew) {
            form.setFieldsValue(orderOffer!);
            return
        }

        if (!offer || !productVariant) {
            throw new Error('OrderOfferForm props fields');
        }

        const defaultQty = 4;
        const initialOrderOffer: Partial<OrderOffer> = {
            qty: defaultQty,
            price: offer.price,
        }

        form.setFieldsValue(initialOrderOffer);
    });

    const handleSubmit = (values: Partial<OrderOffer>) => {
        onSubmit({
            offer: {
                ...offer,
                ...(productVariant ? {productVariant} : {}),
            },
            offer_id: offer?.id,
            ...(orderOffer || {}),
            price: values.price,
            qty: parseInt(values.qty!.toString()),
        } as Partial<OrderOffer>);
    }

    const prodName = `${(productVariant || orderOffer?.offer?.productVariant)?.name} (${vendorName})`;

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
        >
            <p><b>{prodName}</b></p>
            <Form.Item label="Кол-во" name="qty">
                <Input
                    inputMode="numeric"
                />
            </Form.Item>
            <Form.Item label="Сумма" name="price">
                <Input
                    inputMode="numeric"
                    disabled={true}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    disabled={!isValid}
                    htmlType="submit"
                >ОК</Button>
            </Form.Item>
        </Form>
    );
}
