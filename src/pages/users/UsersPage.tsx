import {FC, useEffect} from "react";
import {UsersTable} from "./components";
import {useUsersStore} from "@store";

const UsersPage: FC = () => {
    const {list, fetchAllUsers} = useUsersStore(state => state)

    useEffect(() => {
        fetchAllUsers()
    }, [])

    return (
        <UsersTable users={list} />
    )
}

export {
    UsersPage
}
