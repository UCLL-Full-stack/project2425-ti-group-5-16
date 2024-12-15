import { Image } from '../model/image';

import imagesDb from '../repository/images.db';

const getAllImages = async (): Promise<Image[]> => imagesDb.getAllImages();

const getImageByUrl = async ({ url }: { url: string }): Promise<Image | null> => {
    const image = await imagesDb.getImageByUrl({ url });
    if (!image) {
        throw new Error(`Image with URL "${url}" does not exist.`);
    }
    return image;
};

export default { getAllImages, getImageByUrl };
