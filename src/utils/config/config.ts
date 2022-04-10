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
            url: stringFromEnv(process.env.REACT_APP_ERMI_API_URL)
        }
    }
}
