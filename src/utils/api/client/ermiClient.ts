import {createClient} from "./index";
import {config} from "../../config";
import {authTokenInterceptor} from "./interceptors/authTokenInterceptor";
import {authStorage} from "../../storage/auth-storage";
import {refreshTokenInterceptor} from "./interceptors/refreshTokenInterceptor";

export const ermiClient = createClient({
    apiConfig: config.api.ermi,
    interceptors: [
        authTokenInterceptor(() => authStorage.get()?.tokens?.token || null),
        refreshTokenInterceptor(({token, refreshToken, user}) => {
            authStorage.set({user, tokens: {token, refreshToken}});
        }, () => {
            authStorage.set({user: null, tokens: {token: '', refreshToken: ''}});
            window.location.reload();
        }),
    ]
})
