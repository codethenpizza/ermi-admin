export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    b2b_discount_group_id: number | null;
    is_admin: number | null
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export type LoginCredentials = {
    email: string;
    password: string;
}

export type LoadUserResp = {
    user: User;
    exp: number;
    iat: number;
}

export type Address = {
    id: number;
    fields: string;
    created_at: Date;
    updated_at: Date;
}

export type RefreshTokenResp = {
    refreshToken: string;
    token: string;
}
