import {AUTH_ROUTES, Order, OrderOffer, Shipping} from "@types";
import {
    EntityFormComponentProps,
    EntityFormHookData,
    useEntityForm
} from "@hooks/useEntityForm";
import {EntityFormProps} from "@components/entity/EntityForm";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {composeRootTo} from "@utils";
import {BaseCrudService, orderService} from "@services";

export interface OrderRowClickHandlers {
    handleOrderOfferRowClick(item: OrderOffer): void;
    handleShippingRowClick(item: Shipping): void;
}

export interface OrderFormHookProps extends EntityFormComponentProps<Order> {
    order?: Partial<Order>;
    fields?: EntityFormProps<Order>['fields'];
    rowClickHandlers?: Partial<OrderRowClickHandlers>;
    crudService?: BaseCrudService;
}

type ListKey = keyof Pick<Order, 'offers' | 'shipping' | 'invoices' | 'discounts'>;

export interface OrderFormHandlerHookData extends EntityFormHookData<Order> {
    handleOrderPropListChange(key: ListKey): (list: any[]) => void;
    getOrderRowClickHandlers(): OrderRowClickHandlers;
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

    const handleOfferFormSubmit = (values: Partial<Order>) => {
        setOrder((state) => {
            const newData = {...state, ...values};
            props.onSubmit?.(newData);
            return newData;
        });
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
        handleOrderPropListChange,
        getOrderRowClickHandlers,
    }
}

