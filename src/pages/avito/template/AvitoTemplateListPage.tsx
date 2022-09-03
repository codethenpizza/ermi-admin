import {FC} from "react";
import {AvitoTemplateTable} from "@containers/avito/template/AvitoTemplateTable";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTES, AVITO_ROUTES} from "@types";
import {composeRootTo} from "@utils";

export const AvitoTemplateListPage: FC = () => {

    const navigate = useNavigate();

    const goToCreationPage = () => {
        navigate(composeRootTo(AUTH_ROUTES.AVITO, AVITO_ROUTES.TEMPLATES, 'new'));
    }

    return (
        <AvitoTemplateTable
            cardExtra={<Button onClick={goToCreationPage}>Создать</Button>}
        />
    );
}
