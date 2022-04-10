import axios, {AxiosInstance} from "axios";
import {CreateClientOptions} from "@types";
import {registerEnrichment} from "./utils/register-enrichment";


export const createClient = ({apiConfig, auth }: CreateClientOptions): AxiosInstance => {
    const client = axios.create({
        baseURL: apiConfig.url,
        headers: {
            'Content-Type': apiConfig.contentType || 'application/json'
        }
    })
    registerEnrichment(client, auth)
    return client
}
