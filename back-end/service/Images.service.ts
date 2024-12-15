/*import { Image } from '../model/image';

import imagesDb from '../repository/images.db';

const getAllImages = (): Image[] => {
    return imagesDb.getAllImages();
}

const getImageByUrl = ({ url }: { url: string }): Image => {

    const image = imagesDb.getImageByUrl({ url });
    if (!image) {
        throw new Error(`Image with URL ${url} not found`);
    }
    return image;
}

export default{ getAllImages, getImageByUrl };

*/
