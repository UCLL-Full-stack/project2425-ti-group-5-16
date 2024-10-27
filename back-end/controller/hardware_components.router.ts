import express, { NextFunction, Request, Response } from 'express';
import Hardware_ComponentsService from '../service/hardware_components.service';

const hardwareComponentsRouter = express.Router();

hardwareComponentsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hardwareComponents = await Hardware_ComponentsService.getAllHardwareComponents();
        res.status(200).json(hardwareComponents);
    } catch (error) {
        next(error);
    }
});

hardwareComponentsRouter.get('/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hardwareComponent = await Hardware_ComponentsService.getHardwareComponentByName({ name: req.params.name });
        res.status(200).json(hardwareComponent);
    } catch (error) {
        next(error);
    }
});

export { hardwareComponentsRouter };