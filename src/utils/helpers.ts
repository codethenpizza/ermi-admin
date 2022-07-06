import {ProductStock} from "@types";

export const formatAttrName = (name: string): string => {
    const arr = name.split('_');
    return arr[1] || arr[0];
}

export const parseStock = (stockStr: string): ProductStock[] => {
    try {
        return JSON.parse(stockStr);
    } catch (e) {
        console.error(e);
    }
    return [];
}
