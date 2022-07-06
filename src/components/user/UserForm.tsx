import React from "react";
import {User} from "@types";
import {EntityForm, EntityFormParams} from "@components/entity/EntityForm";
import {Checkbox} from "antd";
import {useEntityFormHandler, UseEntityFormHandlerParams} from "@hooks/useEntityFormHandler";
import {userService} from "@services/users";

export interface UserFormProps extends Partial<UseEntityFormHandlerParams> {
    user?: User;
}

export const UserForm: React.FC<UserFormProps> = (props) => {

    const {user} = props;

    const fields: EntityFormParams['fields'] = [
        {
            name: 'name',
            initialValue: user?.name,
            label: 'Имя',
        },
        {
            name: 'email',
            initialValue: user?.email,
            label: 'Email',
        },
        {
            name: 'phone',
            initialValue: user?.phone,
            label: 'Телефон',
        },
        {
            name: 'password',
            initialValue: '',
            label: 'Пароль',
        },
        {
            name: 'is_admin',
            initialValue: user?.is_admin,
            label: 'Админ',
            valuePropName: 'checked',
            children: <Checkbox/>,
        },
        // TODO add b2b group selector (from store)
    ];

    const formProps = useEntityFormHandler({...props, crudService: userService, fields, id: user?.id})

    return <EntityForm layout="vertical" {...formProps} />
}
