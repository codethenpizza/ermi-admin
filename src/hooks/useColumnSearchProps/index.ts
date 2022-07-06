import {useColumnSearchPropsComponents} from "@hooks/useColumnSearchProps/useColumnSearchPropsComponents";
import {ColumnDataType} from "@types";

export const useColumnSearchProps = <T>(): Partial<ColumnDataType<T>> => {
    return useColumnSearchPropsComponents() as Partial<ColumnDataType<T>>;
};
