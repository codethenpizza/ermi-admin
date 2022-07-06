import {IImage, ProductVariantImage} from "@types";
import {ReactNode, useEffect, useState} from "react";
import {Button, message, Modal} from "antd";
import {BaseCrudService} from "@services";
import {
    DraggableProductVariantImage,
    ProductVariantImageListProps
} from "@components/productVariantImage/ProductVariantImageDraggableList/ProductVariantImageDraggableList";
import {ImageChooser} from "@components/image/ImageChooser";
import {productVariantService} from "@services/productVariant";

export interface UseImageHandlerOptions {
    productVariantImages: ProductVariantImage[];
    productVariantId: number;
    imageService: BaseCrudService;
    onSave?: (productVariantImages: ProductVariantImage[]) => void;
}

export interface UseImageHandlerResp {
    actionButtons: ReactNode[];
    productVariantImageListProps: ProductVariantImageListProps;
}

export const useImageHandler = (options: UseImageHandlerOptions): UseImageHandlerResp => {

    const {
        productVariantImages,
        onSave = () => {},
        productVariantId,
    } = options;


    const initialData = productVariantImages
        .sort((a, b) => a.position - b.position)
        .map(x => ({...x, id: x.image.id}));

    const [items, setItems] = useState<DraggableProductVariantImage[]>(initialData);
    const [isEdit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setItems(initialData);
    }, [initialData.length])

    const handleSave = async () => {

        await updateImages(items);
        await onSave(items);
        setEdit(false);
    }

    const handleCancelEdit = () => {

        setItems(initialData);
        setEdit(false);
    }

    const handleAddImage = () => {
        const handleImagesSelect = (images: IImage[]) => {
            const productVariantImages: DraggableProductVariantImage[] = images.map((image) => ({
                image,
                id: image.id,
                image_id: image.id,
                product_variant_id: productVariantId,
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

    const updateImages = async (productVariantImages: ProductVariantImage[]) => {
        setLoading(true);

        const key = 'handleImagesUpdate';
        message.open({content: 'Обновление...', key, type: 'loading'});

        try {
            await productVariantService.updateImages(productVariantId, productVariantImages);
            message.open({content: 'Обновление успешно', key, type: 'success'});
        } catch (e) {
            console.error(e);
            message.open({content: 'Ошибка', key, type: 'error'});
        }

        setLoading(false);
    }


    const EditBtn = <Button onClick={() => setEdit(true)} key="EditBtn" disabled={loading}>Редактировать</Button>;

    const SaveBtn = <Button onClick={handleSave} type="primary" key="SaveBtn" loading={loading}>Сохранить</Button>

    const CancelBtn = <Button onClick={handleCancelEdit} key="CancelBtn" disabled={loading}>Отменить</Button>

    const AddImageBtn = <Button onClick={handleAddImage} type="dashed" key="AddImageBtn" disabled={loading}>Добавить</Button>


    return {
        actionButtons: isEdit ? [AddImageBtn, SaveBtn, CancelBtn] : [EditBtn],
        productVariantImageListProps: {items, setItems, isEdit},
    }
}
