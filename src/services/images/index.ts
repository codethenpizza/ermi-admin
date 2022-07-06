import {BaseCrudService} from "@services";
import {IImage} from "@types";

class ImageService extends BaseCrudService<IImage> {
    constructor() {
        super({endpoint: 'images'});
    }

    async upload(images: File[]): Promise<IImage[]> {
        const formData = new FormData();
        images.forEach((image) => {
            formData.append('images', image);
        });

        const resp = await this.client.post<IImage[]>(`/${this.endpoint}`, formData);

        return resp.data;
    }

}

export const imageService = new ImageService();
