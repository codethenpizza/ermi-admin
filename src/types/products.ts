export type ProductVariant<T extends ProductAttr = {}> = {
    id: number;
    name: string;
    product_id: number;
    variant_code: string;
    desc?: string;
    is_available: boolean;
    attrs: T;
    images: Image[];
    cat_ids: number[];
    offer: Offer;
    product: Product;
}

export type Product = {
    id: number;
    name: string;
    desc: string;
    attr_set_id: number;
}

export type Offer = {
    id: number;
    in_stock_qty: number;
    is_available: boolean;
    vendor_code: string;
    vendor_id: number;
    price: number;
    discount_price?: number;
    images: Image[];
    stock: ProductStock[];
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

export type Image = {
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
