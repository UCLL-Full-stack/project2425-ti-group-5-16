import express, { NextFunction, Request, Response } from 'express';
import imagesService from '../service/images.service';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const imagesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Image management
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Image:
 *       type: object
 *       properties:
 *        url:
 *           type: string
 *           description: URL of the image.
 *         details:
 *           type: string
 *           description: explains the image.
 */

/**
 * @swagger
 * /images:
 *   get:
 *     summary: Retrieve a list of images
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: A list of images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
imagesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const images = await imagesService.getAllImages();
        res.status(200).json(images);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /images/{url}:
 *   get:
 *     summary: Retrieve an image by URL
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: The image URL
 *     responses:
 *       200:
 *         description: An image object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
imagesRouter.get('/:url', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const image = await imagesService.getImageByUrl({ url: req.params.url });
        res.status(200).json(image);
    } catch (error) {
        next(error);
    }
});

export { imagesRouter };
