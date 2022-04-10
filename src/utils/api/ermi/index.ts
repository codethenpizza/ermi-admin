import {createClient} from "../client/create-client";
import {config} from "../../config/config";
import {withAuthToken} from "../client/enrichers";

export const ermiClient = createClient({
    apiConfig: config.api.ermi,
    auth: {
        enrichers: [withAuthToken]
    }
})
