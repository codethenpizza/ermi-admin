import {FC, useEffect, useState} from "react";
import {AvitoTemplateForm} from "@containers/avito/template/AvitoTemplateForm";
import {AUTH_ROUTES, AVITO_ROUTES, AvitoTemplate} from "@types";
import {useNavigate, useParams} from "react-router-dom";
import {avitoTemplateService} from "@services/AvitoService";
import {composeRootTo} from "@utils";
import {Button, Card, message, Space} from "antd";

export const AvitoTemplateSinglePage: FC = () => {

    const params = useParams();
    const id = parseInt(params.id || '');

    const navigate = useNavigate();

    const [template, setTemplate] = useState<AvitoTemplate | undefined>();

    const isNew = isNaN(id);


    useEffect(() => {
        if (!isNew) {
            avitoTemplateService.fetchItem(id)
                .then(setTemplate);
        }
    }, [id, isNew]);


    const title = isNew ? 'Создание нового шаблона объявления' : 'Редактирование шаблона объявления';

    const returnToListPage = () => {
        navigate(composeRootTo(AUTH_ROUTES.AVITO, AVITO_ROUTES.TEMPLATES));
    }

    const makeDefault = () => {
        if (isNew) {
            return;
        }

        avitoTemplateService.setDefault(id).then(() => {
            message.success('Успешно!');
            returnToListPage();
        }).catch(() => {
            message.error('Ошибка!');
        });
    }

    const handleDelete = () => {
        if (isNew) {
            return;
        }

        avitoTemplateService.deleteItem(id).then(() => {
            message.success('Успешно!');
            returnToListPage();
        }).catch(() => {
            message.error('Ошибка!');
        });
    }

    const setDefaultBtn = !isNew && !template?.default && <Button onClick={makeDefault}>Сделать дефолтом</Button>;

    const deleteBtn = !isNew && <Button onClick={handleDelete}>Удалить</Button>

    const extra = <Space>
        {setDefaultBtn}
        {deleteBtn}
    </Space>;

    const onSubmit = (item: Partial<AvitoTemplate>) => {
        if (isNew) {
            avitoTemplateService.createItem(item).then(returnToListPage);
        } else {
            avitoTemplateService.updateItem(id, item).then(returnToListPage);
        }
    }

    return (
        <Card title={title} extra={extra}>
            <AvitoTemplateForm
                template={template}
                onSubmit={onSubmit}
            />
        </Card>
    );
}
