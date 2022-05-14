import {AntTableKey, User} from "@types";

export type TableUserItem = Omit<User, 'is_admin'> & {is_admin: string} & AntTableKey
