import {BaseFetchListParams, SORT} from "@types";
import {BaseCrudService} from "@services";
import {TableProps} from "antd/lib/table/Table";
import {FilterValue, SorterResult, TablePaginationConfig} from "antd/lib/table/interface";
import {useEffect, useState} from "react";
import {GetStateFn} from "../types/common";

export interface UsePaginationState {
    list?: any[];
    loading?: boolean;
    pagination?: TablePaginationConfig;
    filters?: Record<string, FilterValue | null> | null;
    sort?: [string, SORT] | null,
}

export interface UsePaginationRespControlParams {
    getState: GetStateFn<Required<UsePaginationState>>;
    updateList: () => Promise<void>;
}

export interface UsePaginationResp<T> {
    paginationProps: TableProps<T>;
    controlParams: UsePaginationRespControlParams;
}

export interface UsePaginationParams extends UsePaginationState {
    crudService: BaseCrudService;
}

export const useTablePagination = <T>(params: UsePaginationParams): UsePaginationResp<T> => {

    const makePaginationParams = (params: UsePaginationParams): Required<UsePaginationState> => {
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

    const [state, setState] = useState<Required<UsePaginationState>>(makePaginationParams(params));

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

        let sort: Required<UsePaginationState>['sort'] = null;
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

    const getFilterValuesHash = (filters: UsePaginationState['filters']) => {
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

    useEffect(() => {
        if (!params.list) {
            updateList();
        }
    }, [
        state.pagination.current,
        state.pagination.pageSize,
        getFilterValuesHash(state.filters),
        state.sort?.join(),
        params.list
    ]);

    return {
        controlParams: {
            getState: () => [state, setState],
            updateList,
        },
        paginationProps: {
            ...params,
            dataSource: state.list,
            loading: state.loading,
            pagination: (state.pagination.total || 0) <= (state.pagination.pageSize || 0) ? false : state.pagination,
            rowKey: 'id',
            onChange: handleTableChange,
        },
    }
}
