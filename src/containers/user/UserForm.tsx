import React from "react";
import {User} from "@types";
import {EntityForm, EntityFormProps} from "@components/entity/EntityForm";
import {Checkbox} from "antd";
import {useEntityForm, EntityFormComponentProps} from "@hooks/useEntityForm";
import {userService} from "@services/users";

export interface UserFormProps extends EntityFormComponentProps<User> {
    user?: User;
}

export const UserForm: React.FC<UserFormProps> = (props) => {

    const {user} = props;

    const fields: EntityFormProps['fields'] = [
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

    const formProps = useEntityForm({...props, crudService: userService, fields, id: user?.id})

    return <EntityForm layout="vertical" {...formProps} />
}
