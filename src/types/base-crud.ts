import {ColumnType, TableProps} from "antd/lib/table";
import {UsePaginationState} from "@hooks";

export type ColumnDataType<T = any> = ColumnType<T> & {
    dataIndex: keyof T | string[];
}

export type CustomTableParams<T> = UsePaginationState & TableProps<T>;
