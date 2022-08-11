import React, {FC, SyntheticEvent, useEffect, useState} from "react";
import {User} from "@types";
import {userService} from "@services/users";
import {Input, Modal} from "antd";
import {UserTable} from "@containers/user/UserTable";

export interface UserSelectProps {
    value?: number;
    onChange?: (userId: number) => void;
    disabled?: boolean;
}

export const UserSelect: FC<UserSelectProps> = (props) => {

    const {value, onChange, disabled} = props;

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (value) {
            userService.fetchItem(value).then(setUser);
        }
    }, [value]);

    const inputValue = user ? `Пользователь: (id - ${user.id}) ${user.name} [${user.phone} | ${user.email}]` : `Пользователь: (id - ${value})`;

    const handleChange = (item: User) => {
        setUser(item);
        onChange?.(item.id);
    }

    const handleClick = (e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (disabled) {
            return;
        }

        const modal = Modal.info({
            title: 'Выбор пользователя',
            width: '90wv',
            content: <UserTable
                onRow={(item) => ({
                    onClick: () => {
                        handleChange(item);
                        modal.destroy();
                    },
                })}
            />,
            icon: null,
            maskClosable: true,
            okButtonProps: {hidden: true}
        });
    }

    return <Input value={inputValue} disabled={disabled} onClick={handleClick} />;
}
