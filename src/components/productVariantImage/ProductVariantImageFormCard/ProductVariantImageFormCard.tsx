import React from "react";
import {ProductVariant, ProductVariantImage} from "@types";
import {useImageHandler} from "@components/productVariantImage/ProductVariantImageFormCard/useImageHandler";
import {imageService} from "@services/images";
import {ProductVariantImageDraggableList} from "@components/productVariantImage/ProductVariantImageDraggableList";
import {Card, Space} from "antd";

export interface ProductVariantImageFormCardProps {
    productVariant: ProductVariant;
}

export const ProductVariantImageFormCard: React.FC<ProductVariantImageFormCardProps> = ({productVariant}) => {

    const productVariantImages: ProductVariantImage[] = (productVariant?.productVariantImgs || []).map((x) => ({
        ...x,
        image: productVariant!.images.find(i => i.id === x.image_id)!,
    }));

    const {
        actionButtons,
        productVariantImageListProps,
    } = useImageHandler({
        productVariantId: productVariant.id,
        productVariantImages,
        imageService: imageService,
    });

    return (
        <Card title={'Изображения'} extra={<Space>{actionButtons}</Space>}>
            <ProductVariantImageDraggableList {...productVariantImageListProps} />
        </Card>
    );
}
