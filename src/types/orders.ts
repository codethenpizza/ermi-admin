import {Address, User} from "./user";
import {Offer, ProductVariant} from "./products";

export enum ORDER_STATUS {
    NEW = 'new',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}


export type Order = {
    id: number;
    uid: string;
    user_id: number;
    user: User;
    payment_strategy_id: number;
    paymentStrategy: PaymentStrategy;
    status: ORDER_STATUS;
    total: number;
    offers: OrderOffer[];
    b2b_discount_id: number;
    created_at: Date;
    updated_at: Date;
    discounts: Discount[];
    shipping: Shipping[];
    invoices: Invoice[];
}

export interface OrderOffer {
    id: number;
    offer_id: number;
    offer: Offer;
    order_id: number;
    price: number;
    qty: number;
    shipping_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface Discount {
    id: number;
    order_id: number;
    discount_type_id: number;
    discountType: DiscountType;
    value: number;
}

export interface DiscountType {
    id: number;
    name: string;
    desc: string;
    strategy: string;
    enabled: boolean;
}

export interface Shipping {
    id: number;
    shipping_type_id: number;
    order_id: number;
    cost: number;
    address_id: number;
    delivery_date_from: Date;
    delivery_date_to: Date;
    status: string; // TODO enum
    comment: string;
    created_at: Date;
    updated_at: Date;
    shippingType: ShippingType;
    address: Address;
    orderOffers: OrderProduct[];
}

export interface ShippingType {
    id: number;
    name: string;
    desc: string;
    strategy: string;
    enabled: boolean;
    paymentStrategies?: PaymentStrategy[];
    created_at: Date;
    updated_at: Date;
}

export interface OrderProduct {
    id: number;
    offer_id: number;
    order_id: number;
    price: number;
    qty: number;
    shipping_id: number;
    created_at: Date;
    updated_at: Date;
    productVariant: ProductVariant;
}

export interface PaymentStrategy {
    id: number;
    name: string;
    strategy: string;
    desc: string;
    enabled: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface Invoice {
    id: number;
    order_id: number;
    desc: string;
    value: number;
    is_paid: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface OrderCalculate {
    shipping: {
        shipping: Shipping;
        orderProducts: OrderProduct[]
    }[];
    discounts: Discount[];
    total: number;
    b2b_discount_id?: number;
}

export interface ShippingStrategy {
    id: number;
    name: string;
    desc: string;
    strategy: string;
    enabled: boolean;
    created_at: Date;
    updated_at: Date;
    paymentStrategies: PaymentStrategy[];
}

export interface PaymentStrategy {
    id: number;
    name: string;
    strategy: string;
    desc: string;
    enabled: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface PickupPoint {
    id: number;
    name: string;
    desc: string;
    address_id: number;
    created_at: Date;
    updated_at: Date;
    address: Address;
}
