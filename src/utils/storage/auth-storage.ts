import {AuthSliceState} from "@store";

export const AUTH_DATA_KEY = 'auth-data';

type AuthState = Pick<AuthSliceState, 'tokens' | 'user'>;

export type AuthStorage = {
    get: () => AuthState | null;
    set: (state: AuthState) => void;
}

export const authStorage: AuthStorage = {
    get: () => {
        const dataString = localStorage.getItem(AUTH_DATA_KEY);

        if (!dataString) {
            return null;
        }

        try {
            const data: {state: AuthState} = JSON.parse(dataString);
            return data.state;
        } catch (e) {
            console.error(e);
            return null;
        }
    },
    set: (state) => {
        let dataString = localStorage.getItem(AUTH_DATA_KEY);

        if (!dataString) {
            return null;
        }

        try {
            const data: {state: AuthState} = JSON.parse(dataString);
            data.state = state;
            dataString = JSON.stringify(data);
            localStorage.setItem(AUTH_DATA_KEY, dataString);
        } catch (e) {
            console.error(e);
        }
    }
}
