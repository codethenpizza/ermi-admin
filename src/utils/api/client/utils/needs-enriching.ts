import {AxiosRequestConfig} from "axios";

export const needsEnriching = ({url}: AxiosRequestConfig, exclude?: string[]): boolean => Boolean(url && !exclude?.includes(url))
