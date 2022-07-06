import React, {Dispatch, SetStateAction, useState} from "react";
import {ProductVariantImage} from "@types";
import {
    closestCenter,
    DndContext,
    DragEndEvent, DragOverlay, DragStartEvent,
    MouseSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
} from '@dnd-kit/sortable';
import {UniqueIdentifier} from "@dnd-kit/core/dist/types/other";
import {ProductVariantImageDraggableListItem} from "@components/productVariantImage/ProductVariantImageDraggableList/ProductVariantImageDraggableListItem/ProductVariantImageDraggableListItem";

export interface ProductVariantImageListProps {
    items: DraggableProductVariantImage[];
    setItems: Dispatch<SetStateAction<DraggableProductVariantImage[]>>;
    isEdit?: boolean;
}

export type DraggableProductVariantImage = (ProductVariantImage & { id: UniqueIdentifier });

export const ProductVariantImageDraggableList: React.FC<ProductVariantImageListProps> = (props) => {

    const {items, setItems, isEdit} = props;

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const sensors = useSensors(
        useSensor(MouseSensor, {
        }),
        useSensor(PointerSensor),
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(x => x.id === active.id);
                const newIndex = items.findIndex(x => x.id === over?.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    }

    const handleOnRemove = (id: UniqueIdentifier) => {
        setItems((state) => (state.filter(x => x.id !== id)));
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items}
                strategy={horizontalListSortingStrategy}
                disabled={!isEdit}
            >
                {items.map((item) => (
                    <ProductVariantImageDraggableListItem key={item.id} item={item} isEdit={isEdit} onRemove={handleOnRemove} />
                ))}
            </SortableContext>
            <DragOverlay>
                {activeId && (
                    <ProductVariantImageDraggableListItem item={items.find(x => x.id === activeId)!} />
                )}
            </DragOverlay>
        </DndContext>
    )
}
