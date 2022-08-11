import {FC, useEffect, useState} from "react";
import {AddEntitiesToTableParams} from "@hooks/useEntityTableEdit";
import {Offer, OrderOffer, ProductVariant} from "@types";
import {ProductTable} from "@components";
import {ProductVariantTable} from "../productVariant/ProductVariantTable";
import {OfferTable} from "../offer/OfferTable";
import {OrderOfferForm} from "./OrderOfferForm";

export interface OrderOfferAddModalProps extends AddEntitiesToTableParams<OrderOffer> {
}

export interface OrderOfferAddModalState {
    productID?: number;
    productVariant?: ProductVariant;
    offer?: Offer;
    qty?: number;
    price?: number;
}

export const OrderOfferAddModal: FC<OrderOfferAddModalProps> = ({addItem}) => {

    const [state, setState] = useState<OrderOfferAddModalState>({qty: 4});

    useEffect(() => {
        if (state.offer && state.qty !== undefined) {
            const price = state.offer.price * state.qty;
            setState((state) => ({...state, price}));
        } else {
            setState((state) => ({...state, price: 0}));
        }
    }, [state.offer, state.qty]);

    if (state.offer) {
        return (
            <OrderOfferForm
                offer={state.offer}
                productVariant={state.productVariant}
                onSubmit={addItem}
            />
        );
    }

    if (state.productVariant) {
        return <OfferTable
            filters={{product_variant_id: [state.productVariant.id]}}
            onRow={(item) => ({
                onClick: () => setState((state) => ({...state, offer: item}))
            })}
        />
    }

    if (state.productID) {
        return <ProductVariantTable
            filters={{product_id: [state.productID]}}
            onRow={(item) => ({
                onClick: () => setState((state) => ({...state, productVariant: item}))
            })}
        />
    }

    return <ProductTable
        onRow={(item) => ({
            onClick: () => setState((state) => ({...state, productID: item.id}))
        })}
    />
}
