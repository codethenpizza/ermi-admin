export type AdminUser = {
    id: string
    email: string
    name: string
    phone: string
    b2b_discount_group_id: string | null
}

export type LoginRequestParams = {
    email: string
    password: string
}

export type LoginResponse = {
    token: string
    refreshToken: string
    user: AdminUser
}
