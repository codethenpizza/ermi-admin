export const rimPrefix = 'rim';

export const getRimFilterName = (column: string) => `${rimPrefix}_${column}`;

export const isRimFilter = (filterName: string) => filterName.indexOf(rimPrefix) === 0;

export const getRimFilterKey = (filterName: string) => filterName.split(`${rimPrefix}_`)[1];
