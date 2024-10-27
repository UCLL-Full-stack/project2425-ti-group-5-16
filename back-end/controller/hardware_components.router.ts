import express, { NextFunction, Request, Response } from 'express';
import hardwareComponentsService from '../service/hardware_components.service';
import { Hardware_Components } from '../model/hardware_components';
import hardware_componentsService from '../service/hardware_components.service';

const hardwareComponentsRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Hardware_Component:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Hardware component ID.
 *         name:
 *           type: string
 *           description: Hardware component name.
 *         type:
 *           type: string
 *           description: Hardware component type.
 *         manufacturer:
 *           type: string
 *           description: Hardware component manufacturer.
 */

/**
 * @swagger
 * /hardware-components:
 *   get:
 *     summary: Get a list of all hardware components.
 *     responses:
 *       200:
 *         description: A list of hardware components.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hardware_Component'
 */
hardwareComponentsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hardwareComponents = await hardwareComponentsService.getAllHardwareComponents();
        res.status(200).json(hardwareComponents);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /hardware-components/{name}:
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
        const hardwareComponent = await hardware_componentsService.getHardwareComponentByName({ name: req.params.name });
        res.status(200).json(hardwareComponent);
    } catch (error) {
        next(error);
    }
});

export { hardwareComponentsRouter };