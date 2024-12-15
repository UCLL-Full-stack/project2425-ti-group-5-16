import ImagesService from '../service/Images.service';
import express, { NextFunction, Request, Response } from 'express';

const imagesRouter = express.Router();

imagesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { image: imageUrl } = req.query; // Query parameter to get image by URL
        if (imageUrl) {
            const image = await ImagesService.getImageByUrl({ url: imageUrl as string });
            res.status(200).json(image);
        } else {
            const images = await ImagesService.getAllImages();
            res.status(200).json(images);
        }
    } catch (error) {
        if (error instanceof Error && error.message.includes('not exist')) {
            res.status(404).json({ message: error.message });
        } else {
            next(error);
        }
    }
});

imagesRouter.get('/:url', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const image = await ImagesService.getImageByUrl({
            url: req.params.url,
        });
        res.status(200).json(image);
    } catch (error) {
        if (error instanceof Error && error.message.includes('not exist')) {
            res.status(404).json({ message: error.message });
        } else {
            next(error);
        }
    }
});

export { imagesRouter };
