import {AvitoAd} from "./avito";

export type ProductVariant<T extends ProductAttr = {}> = {
    id: number;
    uid: string;
    name: string;
    product_id: number;
    desc?: string;
    is_available: boolean;
    attrs: T;
    images: IImage[];
    offers: Offer[];
    product: Product;
    productVariantImgs: ProductVariantImage[];
    avitoAd?: AvitoAd;
}

export type Product = {
    id: number;
    uid: string;
    name: string;
    desc: string;
    attr_set_id: number;
    variants: ProductVariant[];
    cats: ProductCategory[];
}

export type ProductCategory = {
    id: number;
    name: string;
    slug: string;
    desc?: string;
    parent_id: number;
    position: number;
};

export interface Offer {
    id: number;
    uid: string;
    price: number;
    discount_price: number;
    product_variant_id: number;
    productVariant: ProductVariant;
    vendor_id: number;
    vendor_code: string;
    in_stock_qty: number;
    is_available: boolean;
    stock: string;
    priority: boolean;
    created_at: Date;
    updated_at: Date;
    images: IImage[];
    offerImages: OfferImage[];
    vendor: Vendor;
}

export interface OfferImage {
    image_id: number;
    offer_id: number;
    position: number;
    created_at: Date;
    updated_at: Date;
}

export interface Vendor {
    id: number;
    name: string;
    slug: string;
    created_at: Date;
    updated_at: Date;
}

export type ProductAttr = Record<string, ProductAttrValue<any>>

export type ProductAttrValue<T> = {
    name: string;
    value: T;
    slug: string;
    type: string;
}

export type ProductStock = {
    name: string;
    shippingTime: {
        from: number;
        to: number;
    };
    count: number;
}

export type IImage = {
    id: number;
    original_uri: string;
    large_uri: string;
    medium_uri: string;
    small_uri: string;
    thumbnail_uri: string;
    name: string;
    mimetype: string;
    size: number;
    position: number;
    ProductVariantImg?: IProductVariantImg;
}

export type IProductVariantImg = {
    image_id: number;
    position: number;
    product_variant_id: number;
}

export type ProductSearchBody = {
    filters?: CatalogFilter<any>[];
    size?: number;
    from?: number;
    searchString?: string;
    sort?: string | SortOption[];
}

export type CatalogFilter<T extends ProductFilterValue> = {
    key: string;
    value: T;
} & ProductFilterValue

export type ProductFilterValue = string | string[] | number | number[] | boolean | RangeFilter;

export type RangeFilter = {
    gt?: number;
    gte?: number;
    lt?: number;
    lte?: number;
}

export type VehicleParams = {
    make: string;
    year: string;
    model: string;
    generation: string;
    trim: string;
}

export type ProductSearchResp<T = ProductVariant> = {
    total: number;
    products: T[];
    attrFilterOptionsMap: CatalogAttrFilterOptionsMap;
}

export type CatalogAttrFilterOptionsMap = {
    [x: string]: CatalogAttrFilter;
}

export type CatalogAttrFilter = {
    name: string;
    options: CatalogAttrFilterOption[];
}

export type CatalogAttrFilterOption = {
    value: string | number;
    count: number;
}

// gba +++++++++++++++++++++++
export type SearchByAxlesResp<T extends ProductVariant> = {
    total: number;
    products: GBACatalogItems<T>;
    attrFilterOptionsMap: CatalogAttrFilterOptionsMap;
}

export type GBACatalogItems<T = ProductVariant> = {
    [groupAttr: string]: {
        front: T[];
        rear: T[]
    };
}

export type GroupedByAxlesProductSearchBody = {
    extFilters: {
        axles: SearchByAxlesParams;
    };
} & ProductSearchBody

export type SearchByAxlesParams = {
    front: CatalogFilter<any>[];
    rear: CatalogFilter<any>[];
}


export type SortOption = string;

export interface AttrSet {
    id: number;
    name: string;
    slug: string;
    desc?: string;
    scheme?: Object;
}


export interface AttrValue {
    id: number;
    attr_id: number;
    product_variant_id: number;
    value: any;
    attribute: Attribute;
}

export interface Attribute {
    id: number;
    name: string;
    slug: string;
    type_id: number;
    aggregatable: boolean;
    type: AttrType;
}

export interface AttrType {
    id: number;
    name: ATTR_TYPE;
}

export enum ATTR_TYPE {
    STRING = 'string',
    NUMBER = 'number',
    DECIMAL = 'decimal',
    JSON = 'json',
    ARRAY = 'array',
    BOOLEAN = 'boolean',
}

export interface ProductVariantImage {
    image_id: number;
    product_variant_id: number;
    position: number;
    image: IImage;
}

export interface ProductVariantImageBulk extends Omit<ProductVariantImage, 'product_variant_id'> {
}
