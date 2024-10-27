import express, { NextFunction, Request, Response } from 'express';
import Hardware_ComponentsService from '../service/hardware_components.service';

const hardwareComponentsRouter = express.Router();

/**
 * @swagger
 * /hardware_components:
 *  get:
 *   summary: Get a list of all hardware components.
 *  responses:
 *   200:
 *   description: A list of hardware components.
 *  content:
 *  application/json:
 *  schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Hardware_Component'
*/

hardwareComponentsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hardwareComponents = await Hardware_ComponentsService.getAllHardwareComponents();
        res.status(200).json(hardwareComponents);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /hardware_components/{name}:
 *   get:
 *     summary: Get a hardware component by name.
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *           required: true
 *           description: The hardware component name.
 *     responses:
 *       200:
 *         description: A hardware component object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hardware_Component'
 */

hardwareComponentsRouter.get('/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hardwareComponent = await Hardware_ComponentsService.getHardwareComponentByName({ name: req.params.name });
        res.status(200).json(hardwareComponent);
    } catch (error) {
        next(error);
    }
});

export { hardwareComponentsRouter };