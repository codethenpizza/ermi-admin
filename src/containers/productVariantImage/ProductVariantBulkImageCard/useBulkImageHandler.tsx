import {IImage, ProductVariantImageBulk} from "@types";
import {ReactNode, useState} from "react";
import {Button, message, Modal} from "antd";
import {BaseCrudService} from "@services";
import {
    DraggableProductVariantImage,
    ProductVariantImageListProps
} from "../ProductVariantImageDraggableList/ProductVariantImageDraggableList";
import {ImageChooser} from "../../image/ImageChooser";
import {productVariantService} from "@services/productVariant";

export interface UseImageHandlerOptions {
    productVariantIds: number[];
    imageService: BaseCrudService;
    onSave?: (productVariantImages: ProductVariantImageBulk[]) => void;
}

export interface UseImageHandlerResp {
    actionButtons: ReactNode[];
    productVariantImageListProps: ProductVariantImageListProps;
}

export const useBulkImageHandler = (options: UseImageHandlerOptions): UseImageHandlerResp => {

    const {
        onSave = () => {},
        productVariantIds,
    } = options;

    const [items, setItems] = useState<DraggableProductVariantImage<ProductVariantImageBulk>[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        await updateImages(items);
        await onSave(items);
    }

    const handleAddImage = () => {
        const handleImagesSelect = (images: IImage[]) => {
            const productVariantImages: DraggableProductVariantImage<ProductVariantImageBulk>[] = images.map((image) => ({
                image,
                id: image.id,
                image_id: image.id,
                position: 0,
            }));
            setItems(state => ([...state, ...productVariantImages]))

            modal.destroy();
        }

        const modal = Modal.info({
            title: 'Загруженные изображения',
            content: <ImageChooser onChoose={handleImagesSelect} />,
            width: '80%',
            icon: null,
            maskClosable: true,
            okButtonProps: {hidden: true}
        });
    }

    const updateImages = async (productVariantImages: ProductVariantImageBulk[]) => {
        setLoading(true);

        const key = 'handleImagesUpdate';
        message.open({content: 'Обновление...', key, type: 'loading'});

        try {
            await productVariantService.updateImagesBulk(productVariantIds, productVariantImages);
            message.open({content: 'Обновление успешно', key, type: 'success'});
        } catch (e) {
            console.error(e);
            message.open({content: 'Ошибка', key, type: 'error'});
        }

        setLoading(false);
    }


    const SaveBtn = <Button onClick={handleSave} type="primary" key="SaveBtn" loading={loading}>Сохранить</Button>

    const AddImageBtn = <Button onClick={handleAddImage} type="dashed" key="AddImageBtn" disabled={loading}>Добавить</Button>


    return {
        actionButtons: [AddImageBtn, SaveBtn],
        productVariantImageListProps: {items, setItems, isEdit: true},
    }
}
