import {AdminUser, AuthTokens, LoginRequestParams} from "@types";
import {devtools, persist} from "zustand/middleware";
import {authService} from "@services/auth";
import create from "zustand";
import {AUTH_DATA_KEY} from "@utils";

export type AuthSliceState = {
    user: AdminUser | null,
    tokens: AuthTokens,
    login: (loginParams: LoginRequestParams) => Promise<void>,
    logout: () => void,
    setTokens: (authToken: string, refreshToken?: string) => void,
    isAuth: () => boolean,
}

export const useAuthStore = create<AuthSliceState>()(
    persist(
        devtools(
            (
                set,
                get
            ) => ({
                user: null,
                tokens: {
                    token: '',
                    refreshToken: '',
                },
                login: async ({email, password}) => {
                    const {token, refreshToken, user} = await authService.login({email, password})
                    set(() => ({user, tokens: {token, refreshToken}}));
                },
                logout: () => {
                    set(() => ({user: null, tokens: {token: '', refreshToken: ''}}));
                },
                setTokens: (token, refreshToken = '') => {
                    set(() => ({tokens: {token, refreshToken}}))
                },
                isAuth: () => {
                    return Boolean(get().user);
                },
            })
        ),
        {
            name: AUTH_DATA_KEY,

        }
    )
);
