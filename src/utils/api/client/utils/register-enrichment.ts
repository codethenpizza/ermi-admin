import {AxiosInstance} from "axios";
import {AuthOptions} from "@types";
import {needsEnriching} from "./needs-enriching";
import {applyEnrichersFns} from "./apply-enrichers-fns";
import {authStorage} from "@utils";

export const registerEnrichment = (client: AxiosInstance, {enrichers, exclude}: AuthOptions): void => {
    client.interceptors.request.use(registerConfig => {
        if (needsEnriching(registerConfig, exclude)) {
            registerConfig = applyEnrichersFns(...enrichers.map(e => e(authStorage)))(registerConfig)
        }

        return registerConfig
    })
}
