import { Images } from '../model/images';

const imagesDB: Images[] = [
    new Images({
        details: "image of of a monitor",
        url: "www.example1.com",
    }),
    new Images({
        details: "image of a keyboard",
        url: "www.example2.com",
    }),
    new Images({
        details: "image of a computermouse",
        url: "www.example3.com",
    }),
    new Images({
        details: "image of a CPU",
        url: "www.example4.com",
    }),
];

const getAllImages = (): Images[] => {
    return imagesDB;
};

const getImageByUrl = ({ url }: { url: string }): Images | null => {
    return imagesDB.find((image) => image.getUrl() === url) || null;
};

export default {getAllImages, getImageByUrl};