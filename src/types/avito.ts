import {Attribute, ProductCategory, ProductVariant} from "./products";

export interface AvitoAd {
    Id: string;
    AvitoId: string;
    AdType: string;
    Address: string;
    BackRimDiameter: string;
    BackTireAspectRatio: string;
    BackTireSectionWidth: string;
    Brand: string;
    Category: string;
    CompanyName: string;
    Condition: string;
    ContactMethod: string;
    ContactPhone: string;
    Description: string;
    DifferentWidthTires: string;
    DisplayAreas: string;
    EMail: string;
    GoodsType: string;
    ImageUrls: string;
    ListingFee: string;
    LoadIndex: string;
    ManagerName: string;
    Model: string;
    Price: string;
    ProductType: string;
    Quantity: string;
    RimBolts: string;
    RimBoltsDiameter: string;
    RimDIA: string;
    RimDiameter: string;
    RimOffset: string;
    RimType: string;
    RimWidth: string;
    RunFlat: string;
    SpeedIndex: string;
    TireAspectRatio: string;
    TireSectionWidth: string;
    TireType: string;
    Title: string;
    TypeId: string;
    productVariantId?: number;
    productVariant?: ProductVariant;
    active?: boolean;
    templateId?: number;
}

export interface AvitoTemplate {
    id?: number;
    title: string;
    description: string;
    cat_id: number;
    default?: boolean;
    productCat?: ProductCategory;
}

export interface AvitoTemplateTag {
    attribute: Attribute;
    tag: string;
}
