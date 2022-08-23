import {ColumnFilterItem} from "antd/es/table/interface";
import create from "zustand";
import {devtools} from "zustand/middleware";
import {attrSetService} from "@services/attr-set";
import {immer} from "zustand/middleware/immer";
import {rimService, tireService} from "@services/ProductTypeService";
import {shippingTypeService} from "@services/ShippingTypeService";
import {getRimFilterKey, isRimFilter} from "@containers/productType/rim/rimFiltersHelper";
import {getTireFilterKey, isTireFilter} from "@containers/productType/tire/tireFiltersHelper";

export type TableFilterName = 'attr_set_id';

export type TableFiltersSliceState = {
    filters: Record<string, ColumnFilterItem[]>;
    getFilter: (filterName: TableFilterName | string) => ColumnFilterItem[];
}

export const useTableFiltersStore = create<TableFiltersSliceState>()(devtools(immer((set, get) => ({
    filters: {},
    getFilter: (filterName) => {
        const {filters} = get();
        if (filters[filterName]) {
            return filters[filterName];
        }

        switch (filterName) {
            case 'attr_set_id':
                attrSetService.fetchList().then(x => {
                    set(state => {
                        state.filters[filterName] = x.rows.map(item => ({text: item.name, value: item.id}));
                    })
                });
                return [];

            case 'shipping_type_id':
                shippingTypeService.fetchList().then(x => {
                    set(state => {
                        state.filters[filterName] = x.rows.map(item => ({text: item.name, value: item.id}));
                    });
                });
                return [];
            default:
        }

        if (isRimFilter(filterName)) {
            rimService.getFilters().then((filters) => {
                const filterKey = getRimFilterKey(filterName);
                set(state => {
                    state.filters[filterName] = (filters[filterKey] || []).map((filter) => ({text: filter, value: filter}));
                })
            })
        }

        if (isTireFilter(filterName)) {
            tireService.getFilters().then((filters) => {
                const filterKey = getTireFilterKey(filterName);
                set(state => {
                    state.filters[filterName] = (filters[filterKey] || []).map((filter) => ({text: filter, value: filter}));
                })
            })
        }

        return [];
    }
}))));
