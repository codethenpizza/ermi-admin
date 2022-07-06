import axios, {AxiosInstance} from "axios";
import {CreateClientOptions} from "@types";


export const createClient = ({apiConfig, interceptors}: CreateClientOptions): AxiosInstance => {
    const client = axios.create({
        baseURL: apiConfig.url,
        headers: {
            'Content-Type': apiConfig.contentType || 'application/json'
        }
    });

    interceptors.forEach((fn) => fn(client.interceptors, client));

    return client;
}
