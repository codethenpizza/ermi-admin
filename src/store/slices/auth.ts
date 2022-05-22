import {AdminUser, LoginRequestParams} from "@types";
import {authService} from "@services";
import create from "zustand";
import {devtools} from "zustand/middleware";
import {authStorage} from "@utils";

export type AuthSliceState = {
    user: AdminUser | null
    tokens: {
        authToken: string
        refreshToken: string
    },
    login: (loginParams: LoginRequestParams) => void
    setTokens: (authToken: string, refreshToken?: string) => void
}

const useAuthStore = create<AuthSliceState>(devtools((set) => ({
    user: null,
    tokens: {
        authToken: '',
        refreshToken: '',
    },
    login: async ({email, password}) => {
        const res = await authService.login({email, password})
        set(() => ({user: res.user, tokens: {authToken: res.token, refreshToken: res.refreshToken}}));
    },
    setTokens: (authToken, refreshToken= '') => {
        set(() => ({tokens: {authToken, refreshToken}}))
    }
})))

useAuthStore.subscribe(authStorage.persist, state => state.tokens)

export {
    useAuthStore
}
