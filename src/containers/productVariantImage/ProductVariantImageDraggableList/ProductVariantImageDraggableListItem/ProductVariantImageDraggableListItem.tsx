import React from "react";
import {Image} from "antd";
import {ProductVariantImage} from "@types";
import {UniqueIdentifier} from "@dnd-kit/core/dist/types/other";
import {CSS} from '@dnd-kit/utilities';
import {useSortable} from "@dnd-kit/sortable";
import styles from './ProductVariantImageDraggableListItem.module.scss';
import {CloseCircleOutlined} from "@ant-design/icons";

export interface ProductVariantImageDraggableListItemProps {
    item: ProductVariantImage & { id: UniqueIdentifier };
    isEdit?: boolean;
    onRemove?: (id: UniqueIdentifier) => void;
}


export const ProductVariantImageDraggableListItem: React.FC<ProductVariantImageDraggableListItemProps> = (props) => {

    const {item, onRemove, isEdit} = props;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({id: item.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <span className={styles.container} ref={setNodeRef} style={style}>
            {isEdit && onRemove && <CloseCircleOutlined className={styles.removeIcon} onClick={() => onRemove?.(item.id)}/>}
            <Image
                {...attributes}
                {...listeners}
                key={item.id}
                width={300}
                src={item.image.original_uri}
                preview={false}
            />
        </span>
    );
}
