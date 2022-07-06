import {ProductVariant} from "./products";

export interface Rim {
    id: number;
    product_id: number;
    brand: string;
    model: string;
    name: string;
    color: string;
    dia: number;
    et: number;
    beadlock?: boolean;
    width: number;
    diameter: number;
    bolts_count: number;
    bolts_spacing: number;
    pcd: number;
    type: string;
    productVariant: ProductVariant;
}
