import {Address} from "./user";
import {ProductVariant} from "./products";

export enum OrderStatus {
    New = 'new',
    InProgress = 'inProgress',
    Completed = 'completed',
    Cancelled = 'cancelled',
}


export type Order = {
    id: number;
    uid: string;
    user_id: number; // ??
    payment_strategy_id: number;
    status: OrderStatus;
    total: number;
    created_at: string;
    updated_at: string;
    discounts: Discount[];
    shipping: Shipping[];
    paymentStrategy: PaymentStrategy;
    invoices: Invoice[];
}

export interface Discount {
    id: number;
    order_id: number;
    discount_type_id: number;
    value: number;
}

export interface Shipping {
    id: number;
    shipping_type_id: number;
    order_id: number;
    cost: number;
    shipping_address_id: number;
    delivery_date_from: Date;
    delivery_date_to: Date;
    status: string; // TODO enum
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
