import { Images } from '../model/images';

const imagesDB: Images[] = [
    new Images({
        details: "image of of a monitor",
        url: "htpps://www.example.com/image1",
    }),
    new Images({
        details: "image of a keyboard",
        url: "htpps://www.example.com/image2",
    }),
    new Images({
        details: "image of a computermouse",
        url: "htpps://www.example.com/image3",
    }),
    new Images({
        details: "image of a CPU",
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