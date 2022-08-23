export const tirePrefix = 'tire';

export const getTireFilterName = (column: string) => `${tirePrefix}_${column}`;

export const isTireFilter = (filterName: string) => filterName.indexOf(tirePrefix) === 0;

export const getTireFilterKey = (filterName: string) => filterName.split(`${tirePrefix}_`)[1];
