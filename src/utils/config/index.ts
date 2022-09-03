import {ApiConfig} from "@types";
import {stringFromEnv} from "./helpers";

export type Config = {
    api: {
        ermi: ApiConfig
    }
}

export const config: Config = {
    api: {
        ermi: {
            url: stringFromEnv('API_URL')
        }
    }
}
