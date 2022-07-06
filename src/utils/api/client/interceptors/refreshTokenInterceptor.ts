import {LoginResponse, RequestInterceptorFn} from "@types";
import {authStorage} from "@utils";

export const refreshTokenInterceptor = (setNewDataFn: (data: LoginResponse) => void, logoutFn: () => void): RequestInterceptorFn =>
    (interceptors, client) => {
        interceptors.response.use(
            (resp) => resp,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    const state = authStorage.get();

                    const refreshToken = state?.tokens?.refreshToken;

                    if (refreshToken) {
                        try {
                            const data = await client.post<LoginResponse>('/auth/refreshToken', {
                                refreshToken
                            });
                            setNewDataFn(data.data);
                            originalRequest._retry = true;
                            return client(originalRequest);
                        } catch (e: any) {
                            if (e?.response?.status === 400) {
                                logoutFn();
                            }
                            return Promise.reject(e);
                        }

                    }
                }

                return Promise.reject(error);
            }
        );
    }
