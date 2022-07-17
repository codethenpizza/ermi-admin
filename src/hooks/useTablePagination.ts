import {BaseFetchListParams, SORT} from "@types";
import {BaseCrudService} from "@services";
import {TableProps} from "antd/lib/table/Table";
import {FilterValue, SorterResult, TablePaginationConfig} from "antd/lib/table/interface";
import {useEffect, useState} from "react";
import {GetStateFn} from "../types/common";

export const DEFAULT_ROW_KEY = 'id';

export interface UsePaginationState<T> {
    list?: T[];
    loading?: boolean;
    pagination?: TablePaginationConfig;
    filters?: Record<string, FilterValue | null> | null;
    sort?: [string, SORT] | null;
}

export interface UsePaginationRespControlParams<T> {
    getState: GetStateFn<Required<UsePaginationState<T>>>;
    updateList: () => Promise<void>;
}

export interface UsePaginationResp<T> {
    paginationProps: TableProps<T>;
    controlParams: UsePaginationRespControlParams<T>;
}

export interface UsePaginationParams<T> extends UsePaginationState<T>, Pick<TableProps<T>, 'rowKey'> {
    crudService: BaseCrudService;
}

export const useTablePagination = <T>(params: UsePaginationParams<T>): UsePaginationResp<T> => {

    const isLocalPagination = Boolean(params.list);

    const makePaginationParams = (params: UsePaginationParams<T>): Required<UsePaginationState<T>> => {
        const list = params.list || [];
        const {
            current = 1,
            total = list.length,
            pageSize = 20,
        } = params.pagination || {};

        return {
            list,
            loading: params.loading || false,
            pagination: {
                current,
                total,
                pageSize,
            },
            filters: params.filters || null,
            sort: params.sort || null,
        }
    };

    const [state, setState] = useState<Required<UsePaginationState<T>>>(makePaginationParams(params));

    const getOffset = () => {
        const {current, pageSize} = state.pagination;
        return pageSize! * (current! - 1);
    }

    const fetchData = async (data: BaseFetchListParams) => {
        setState((state) => ({...state, loading: true}));
        try {
            const {count, rows} = await params.crudService.fetchList(data);
            setState((state) => ({
                ...state,
                list: rows,
                pagination: {
                    ...state.pagination,
                    total: count
                }
            }));
        } catch (e) {
            console.error(e);
        } finally {
            setState((state) => ({...state, loading: false}));
        }
    };

    const updateList = async () => {
        const data: BaseFetchListParams = {
            limit: state.pagination.pageSize,
            offset: getOffset(),
            filters: state.filters || undefined,
            sort: state.sort || undefined,
        }

        await fetchData(data);
    }

    const handleTableChange: TableProps<any>['onChange'] = (
        pagination,
        filters,
        sorter,
        // extra
    ) => {

        if (filters) {
            Object.keys(filters).forEach((key) => {
                if (!filters[key]) {
                    delete filters[key];
                }
            })
        } else {
            filters = {};
        }

        let sort: Required<UsePaginationState<T>>['sort'] = null;
        const s = (sorter as SorterResult<any>);
        if (s.order) {
            sort = [s.field as string, s.order === 'ascend' ? SORT.ASC : SORT.DESC];
        }

        setState((state) => ({
            ...state,
            pagination: {...state.pagination, ...pagination},
            filters: {...(params.filters || {}), ...filters},
            sort,
        }));
    }

    const getFilterValuesHash = (filters: UsePaginationState<T>['filters']) => {
        if (!filters) {
            return 0;
        }

        return Object.values(filters)
            .filter(Boolean)
            .reduce<any[]>((acc, arr) => {
                if (arr) {
                    acc.push(...arr);
                }
                return acc;
            }, []).join(',');
    }

    const getDataSource = () => {
        if (isLocalPagination) {
            const offset = getOffset();
            return state.list.slice(offset, offset + state.pagination.pageSize!);
        }

        return state.list;
    }


    useEffect(() => {
        if (!isLocalPagination) {
            updateList().then();
        }
    }, [
        state.pagination.current,
        state.pagination.pageSize,
        getFilterValuesHash(state.filters),
        state.sort?.join(),
        params.list,
        isLocalPagination,
    ]);

    useEffect(() => {
        if (isLocalPagination) {
            setState((state) => ({...state, list: params.list!}))
        }
    }, [params.list])


    return {
        controlParams: {
            getState: () => [state, setState],
            updateList,
        },
        paginationProps: {
            ...params,
            dataSource: getDataSource(),
            loading: state.loading,
            pagination: (state.pagination.total || 0) <= (state.pagination.pageSize || 0) ? false : state.pagination,
            rowKey: params.rowKey || DEFAULT_ROW_KEY,
            onChange: handleTableChange,
        },
    }
}
