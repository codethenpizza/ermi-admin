import {FC, useState} from "react";
import {useEffectOnce} from "react-use";
import {AvitoTemplateTag} from "@types";
import {avitoTemplateService} from "@services/AvitoService";

export const AvitoTemplateTagList: FC = () => {

    const [list, setList] = useState<AvitoTemplateTag[]>([]);

    useEffectOnce(() => {
        avitoTemplateService.getTags().then(setList);
    });

    return (
        <ul>
            {list.map(tag => (<li key={tag.tag}><b>{tag.tag}</b> - {tag.attribute.name}</li>))}
        </ul>
    );
}
