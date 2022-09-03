import {RouteObject} from "react-router-dom";
import {AVITO_ROUTES} from "@types";
import {AvitoAdsPage} from "@pages/avito/ad/AvitoAdsPage";
import {AvitoTemplateListPage} from "@pages/avito/template/AvitoTemplateListPage";
import {AvitoTemplateSinglePage} from "@pages/avito/template/AvitoTemplateSinglePage";

export const avitoRoutes: RouteObject[] = [
    {
        path: AVITO_ROUTES.ADS,
        element: <AvitoAdsPage />,
    },
    {
        path: AVITO_ROUTES.TEMPLATES,
        element: <AvitoTemplateListPage />,
    },
    {
        path: `${AVITO_ROUTES.TEMPLATES}/:id`,
        element: <AvitoTemplateSinglePage />,
    },
];
