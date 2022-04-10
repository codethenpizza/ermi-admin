import {ermiClient} from '@utils'
import {LoginRequestParams, LoginResponse} from "@types";

export const login = async ({email, password}: LoginRequestParams): Promise<LoginResponse> => {
    const resp = await ermiClient.request<LoginResponse>({
        method: 'post',
        url: '/auth/login',
        data: {
            email,
            password
        },
    })
    return resp.data
}
