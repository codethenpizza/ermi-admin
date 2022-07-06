import {ermiClient} from '@utils'
import {LoginRequestParams, LoginResponse} from "@types";
import {AxiosInstance} from "axios";

class AuthService {

    constructor(
        private client: AxiosInstance,
    ) {
    }

    login(params: LoginRequestParams): Promise<LoginResponse> {
        return this.client.post('/auth/login', params).then(x => x.data);
    }

}

export const authService = new AuthService(ermiClient);
