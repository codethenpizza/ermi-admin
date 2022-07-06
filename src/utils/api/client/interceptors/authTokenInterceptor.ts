import {RequestInterceptorFn} from "@types";

export const authTokenInterceptor = (getToken: () => string | null): RequestInterceptorFn =>
    (interceptors) => {
        interceptors.request.use((config) => {
            const token = getToken();

            if (config.headers && token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
    }
