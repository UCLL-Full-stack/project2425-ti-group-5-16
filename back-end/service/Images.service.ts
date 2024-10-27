import { Images } from '../model/images';

import imagesDb from '../repository/images.db';

const getAllImages = (): Images[] => {
    return imagesDb.getAllImages();
}

const getImageByUrl = ({ url }: { url: string }): Images => {
    const image = imagesDb.getImageByUrl({ url });
    if (!image) {
        throw new Error(`Image with URL ${url} not found`);
    }
    return image;
}

export { getAllImages, getImageByUrl };

