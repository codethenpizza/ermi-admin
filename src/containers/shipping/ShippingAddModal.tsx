import {FC} from "react";
import {AddEntitiesToTableParams} from "@hooks/useEntityTableEdit";
import {Shipping} from "@types";
import {ShippingForm} from "@containers/shipping/ShippingForm";

export interface ShippingAddModalProps extends AddEntitiesToTableParams<Shipping> {
}

export const ShippingAddModal: FC<ShippingAddModalProps> = ({addItem}) => {
    return <ShippingForm onSubmit={addItem} isEdit={true} hideEditIcon={true} />
}
