import {AuthEnricher} from "@types";
import {AuthStorage} from "@utils";

export const withAuthToken: AuthEnricher = (authStorage: AuthStorage) => (requestConfig) => {
    if (!requestConfig.headers) {
        requestConfig.headers = {};
    }

    if (!requestConfig.headers.Authorization) {
        requestConfig.headers.Authorization = `Bearer ${authStorage.getAuth}`;
    }

    return requestConfig
}
