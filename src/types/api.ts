import {AxiosRequestConfig} from "axios";

export type AuthenticationTokens = {
    authToken: string
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

export type AuthEnricher = (storage: any) => (c: AxiosRequestConfig) => AxiosRequestConfig

export type AuthOptions = {
    enrichers: AuthEnricher[]
    exclude?: string[]
}

export type CreateClientOptions = {
    apiConfig: ApiConfig
    auth: AuthOptions
}
