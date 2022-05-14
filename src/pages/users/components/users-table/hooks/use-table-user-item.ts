import {User} from "@types";
import {useMemo} from "react";
import {TableUserItem} from "../types";

export const useTableUserItem = (users: User[]): TableUserItem[] => {
    return useMemo(() => {
         return users.map(({is_admin, ...u}) => {
           return {
             ...u,
             is_admin: is_admin ? 'yup' : 'nah',
             key: `${u.id}`}
         })
    }, [users])
}
