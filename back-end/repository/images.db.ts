import { Images } from '../model/images';

const imagesDB: Images[] = [
    new Images({
        url: "htpps://www.example.com/image1",
    }),
    new Images({
        url: "htpps://www.example.com/image2",
    }),
    new Images({
        url: "htpps://www.example.com/image3",
    }),
    new Images({
        url: "htpps://www.example.com/image4",
    }),
];

const getAllImages = (): Images[] => {
    return imagesDB;
};

const getImageByUrl = ({ url }: { url: string }): Images | null => {
    return imagesDB.find((image) => image.getUrl() === url) || null;
};

export default {getAllImages, getImageByUrl};