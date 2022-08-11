import {AUTH_ROUTES, Order, ORDER_STATUS, OrderOffer, Shipping, ShippingType} from "@types";
import {
    EntityFormComponentProps,
    EntityFormHookData,
    useEntityForm
} from "@hooks/useEntityForm";
import {EntityFormProps} from "@components/entity/EntityForm";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {composeRootTo} from "@utils";
import {orderService} from "@services";
import {message} from "antd";
import {OrderService} from "@services/OrderService";
import {DefaultOptionType} from "rc-select/lib/Select";
import {useEffectOnce} from "react-use";
import {Select} from "antd/es";
import {UserSelect} from "@containers/user/UserSelect";

export interface OrderRowClickHandlers {
    handleOrderOfferRowClick(item: OrderOffer): void;
    handleShippingRowClick(item: Shipping): void;
}

export interface OrderFormHookProps extends EntityFormComponentProps<Order> {
    order?: Partial<Order>;
    fields?: EntityFormProps<Order>['fields'];
    rowClickHandlers?: Partial<OrderRowClickHandlers>;
    crudService?: OrderService;
}

type ListKey = keyof Pick<Order, 'offers' | 'shipping' | 'invoices' | 'discounts'>;

export interface OrderFormHandlerHookData extends EntityFormHookData<Order> {
    handleOrderPropListChange(key: ListKey): (list: any[]) => void;
    getOrderRowClickHandlers(): OrderRowClickHandlers;
    order: Partial<Order>;
}

export const useOrderFormHook = (props: OrderFormHookProps): OrderFormHandlerHookData => {

    const {
        order: initialOrder = {},
        rowClickHandlers = {},
        crudService = orderService,
    } = props;

    const navigate = useNavigate();

    const [order, setOrder] = useState(initialOrder);

    useEffect(() => {
        console.log('OrderForm order update', order);
    }, [order]);

    const statusOptions: DefaultOptionType[] = [
        {label: 'Новый', value: ORDER_STATUS.NEW},
        {label: 'В обработке', value: ORDER_STATUS.IN_PROGRESS},
        {label: 'Выполнен', value: ORDER_STATUS.COMPLETED},
        {label: 'Отменен', value: ORDER_STATUS.CANCELLED},
    ];

    const [shippingTypesList, setShippingTypesList] = useState<ShippingType[]>([]);

    useEffectOnce(() => {
        orderService.getShippingTypeList().then(x => setShippingTypesList(x));
    });

    const getPaymentTypesList = (shippingTypeId: number): DefaultOptionType[] => {
        return (shippingTypesList.find(x => x.id === shippingTypeId)?.paymentStrategies || []).map(x => ({
            label: x.name,
            value: x.id,
        }));
    }

    const fields: EntityFormProps['fields'] = [
        {
            name: 'status',
            initialValue: initialOrder.status || ORDER_STATUS.NEW,
            label: 'Статус',
            children: <Select options={statusOptions} dropdownMatchSelectWidth={false}/>
        },
        {
            name: 'payment_strategy_id',
            initialValue: initialOrder.payment_strategy_id,
            label: 'Способ оплаты',
            children: <Select
                options={getPaymentTypesList(order.shipping?.[0]?.shipping_type_id || 0)}
                dropdownMatchSelectWidth={false}
            />
        },
        {
            name: 'user_id',
            initialValue: initialOrder.user_id,
            label: 'Пользователь',
            children: <UserSelect />,
        }
    ];

    const handleOfferFormSubmit = async (values: Partial<Order>) => {
        const key = 'handleOrderSubmitMessage';

        const orderData = {...order, ...values};

        if (orderData.id) {
            message.open({content: 'Обновление...', key, type: 'loading'});
            const recalculatedOrder = await crudService.updateItem(orderData.id, orderData);
            setOrder(recalculatedOrder);
            message.open({content: 'Обновление успешно', key, type: 'success'});
        } else {
            message.open({content: 'Создание...', key, type: 'loading'});
            const newOrder = await crudService.createItem(orderData);
            setOrder(newOrder);
            message.open({content: 'Создание успешно', key, type: 'success'});
        }
    }

    const handleCancelEdit = () => {
        setOrder(initialOrder);
        props.onCancelEdit?.();
    }

    const handleOrderPropListChange = (key: keyof Pick<Order, 'offers' | 'shipping' | 'invoices' | 'discounts'>) =>
        (list: any[]) => {
            if (formProps.isEdit) {
                setOrder((state) => ({...state, [key]: list}))
            }
        };


    const defaultRowClickHandlers = {
        handleOrderOfferRowClick: (item: OrderOffer) => {
            const {productVariant, product_variant_id} = item.offer;
            navigate(composeRootTo(AUTH_ROUTES.PRODUCTS, productVariant.product_id.toString(), 'variant', product_variant_id.toString()))
        },
        handleShippingRowClick: (item: Shipping) => {
            console.log('go to Shipping with id: ', item.id);
        }
    };

    const getOrderRowClickHandlers = () => ({...defaultRowClickHandlers, ...rowClickHandlers})


    const formProps = useEntityForm<Order>({
        hideActionButtons: true,
        hideEditIcon: true,
        crudService,
        ...props,
        id: order.id,
        onCancelEdit: handleCancelEdit,
        onSubmit: handleOfferFormSubmit,
    });

    return {
        ...formProps,
        fields,
        order,
        handleOrderPropListChange,
        getOrderRowClickHandlers,
    }
}

