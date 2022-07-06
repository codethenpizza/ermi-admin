import {Axios, AxiosInstance, AxiosRequestConfig} from "axios";
import {FilterValue} from "antd/lib/table/interface";

export type AuthTokens = {
    token: string
    refreshToken: string
}

export type ApiConfig = {
    contentType?: string
    url: string
}

export enum AppEnv {
    PROD = 'prod',
    DEV = 'dev',
    LOCAL = 'local'
}

export type AuthEnricher = (state: any) => (c: AxiosRequestConfig) => AxiosRequestConfig

export type AuthOptions = {
    enrichers: AuthEnricher[]
    exclude?: string[]
}

export type RequestInterceptorFn = (interceptors: Axios['interceptors'], client: AxiosInstance) => void;

export type CreateClientOptions = {
    apiConfig: ApiConfig;
    interceptors: RequestInterceptorFn[];
}

export enum SORT {
    ASC = 'ASC',
    DESC = 'DESC',
}

export type BaseFetchListParams = {
    limit?: number;
    offset?: number;
    filters?: Record<string, FilterValue | null>;
    sort?: [string, SORT];
}

export type ListParams = {
    limit?: number
    page?: number // offset = limit * page -1
    total?: number
}

export type ListResp<T> = {
    rows: T[],
    count: number
}
