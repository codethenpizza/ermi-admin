import {FC} from "react";
import {AddEntitiesToTableParams} from "@hooks/useEntityTableEdit";
import {Discount} from "@types";
import {DiscountForm} from "@containers/discount/DiscountForm";

export interface DiscountAddModalProps extends AddEntitiesToTableParams<Discount> {
}

export const DiscountAddModal: FC<DiscountAddModalProps> = ({addItem}) => {

    return <DiscountForm onSubmit={addItem} isEdit={true} />
}
