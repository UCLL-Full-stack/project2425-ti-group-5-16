import express, { NextFunction, Request, Response } from 'express';
import imagesService from '../service/images.service';

const imagesRouter = express.Router();

imagesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const images = await imagesService.getAllImages();
        res.status(200).json(images);
    } catch (error) {
        next(error);
    }
});

imagesRouter.get('/:url', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const image = await imagesService.getImageByUrl({ url: req.params.url });
        res.status(200).json(image);
    } catch (error) {
        next(error);
    }
});

export { imagesRouter };
