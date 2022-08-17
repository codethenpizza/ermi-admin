import React from "react";
import {useBulkImageHandler} from "./useBulkImageHandler";
import {imageService} from "@services/images";
import {ProductVariantImageDraggableList} from "../ProductVariantImageDraggableList";
import {Card, Space} from "antd";
import {ProductVariantImageBulk} from "@types";

export interface ProductVariantBulkImageCardProps {
    productVariantIds: number[];
    onSave: (productVariantImages: ProductVariantImageBulk[]) => void;
}

export const ProductVariantBulkImageCard: React.FC<ProductVariantBulkImageCardProps> = ({productVariantIds, onSave}) => {

    const {
        actionButtons,
        productVariantImageListProps,
    } = useBulkImageHandler({
        productVariantIds,
        imageService: imageService,
        onSave,
    });

    return (
        <Card title={'Изображения'} extra={<Space>{actionButtons}</Space>}>
            <ProductVariantImageDraggableList {...productVariantImageListProps} />
        </Card>
    );
}
