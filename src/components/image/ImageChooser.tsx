import React, {useState} from "react";
import {Button, Divider, Tabs} from "antd";
import {ImageTable, ImageTableProps} from "@components/image/ImageTable";
import {ImageLoader, ImageLoaderProps} from "@components/image/ImageLoader";
import {IImage} from "@types";

const {TabPane} = Tabs;

export interface ImageChooserProps {
    tableProps?: ImageTableProps;
    loaderProps?: ImageLoaderProps;
    onChoose: (images: IImage[]) => void;
}

export const ImageChooser: React.FC<ImageChooserProps> = (props) => {

    const {tableProps = {}, loaderProps = {}, onChoose} = props;

    const [state, setState] = useState<IImage[]>([]);

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Список изображений" key="1">
                <Button onClick={() => onChoose(state)} type="primary">Выбрать</Button>
                <Divider/>
                <ImageTable
                    rowSelection={{
                        type: 'checkbox',
                        onSelect: (_, __, selected) => setState(selected),
                    }}
                    {...tableProps}
                />
            </TabPane>
            <TabPane tab="Загрузка изображений" key="2">
                <ImageLoader
                    onUpload={onChoose}
                    {...loaderProps}
                />
            </TabPane>
        </Tabs>
    );
}
