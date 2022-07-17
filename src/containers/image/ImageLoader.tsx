import {IImage} from "@types";
import {Upload, Modal, Button, Divider, message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {UploadFile, UploadProps, RcFile} from "antd/es/upload/interface";
import {imageService} from "@services/images";

export interface ImageLoaderProps {
    onUpload?: (images: IImage[]) => void;
}


export const ImageLoader: React.FC<ImageLoaderProps> = (props) => {

    const {
        onUpload = () => {
        }
    } = props;

    const [loading, setLoading] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);


    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleBeforeUpload: UploadProps['beforeUpload'] = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            // this is local preview
            // @ts-ignore
            file.url = e.target.result;
            setFileList([...fileList, file]);
        }

        return false;
    }

    const handleRemove: UploadProps['onRemove'] = (file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        setFileList(newFileList);
    };


    const handleUpload = async () => {
        setLoading(true);

        try {
            const images = await imageService.upload(fileList as RcFile[]);
            onUpload(images);
            setFileList([]);
        } catch (e) {
            console.error(e);
            message.error('Ну удалось загрузить изображения на сервер');
        }

        setLoading(false);
    }

    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Выбрать</div>
        </div>
    );


    return (
        <>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={!fileList.length}
                loading={loading}
            >Загрузить</Button>
            <Divider/>
            <Upload
                accept="image/*"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                beforeUpload={handleBeforeUpload}
                onRemove={handleRemove}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {/*@ts-ignore*/}
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{width: '100%'}} src={previewImage}/>
            </Modal>
        </>
    );
}
