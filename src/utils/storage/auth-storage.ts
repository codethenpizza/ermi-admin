import {AuthenticationTokens} from "@types";

const authKey = 'authToken'
const refreshKey = 'refreshToken'

export const authStorage: AuthStorage = {
    clear: () => {
        localStorage.removeItem(authKey)
        localStorage.removeItem(refreshKey)
    },
    get: () => ({
        authToken: localStorage.getItem(authKey) || '',
        refreshToken: localStorage.getItem(refreshKey) || ''
    }),
    getAuth: () => localStorage.getItem(authKey) || '',
    getRefresh: () => localStorage.getItem(refreshKey) || '',
    persist: ({authToken, refreshToken}) => {
        localStorage.setItem(authKey, authToken)
        localStorage.setItem(refreshKey, refreshToken)
    }
}

export type AuthStorage = {
    clear: () => void
    get: () => AuthenticationTokens
    getAuth: () => AuthenticationTokens['authToken']
    getRefresh: () => AuthenticationTokens['refreshToken']
    persist: (tokens: AuthenticationTokens) => void
}
