import hardwareComponentsService from '../service/hardwareComponents.service';
import express, { NextFunction, Request, Response } from 'express';

//import { hardwareComponentsInput } from '../types/index';

const hardwareComponentsRouter = express.Router();

hardwareComponentsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hardwareComponents = await hardwareComponentsService.getAllHardwareComponents();
        res.status(200).json(hardwareComponents);
    } catch (error) {
        next(error);
    }
});

hardwareComponentsRouter.get('/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hardwareComponent = await hardwareComponentsService.getHardwareComponentByName({
            name: req.params.name,
        });
        res.status(200).json(hardwareComponent);
    } catch (error) {
        if (error instanceof Error && error.message.includes('not found')) {
            res.status(404).json({ message: error.message });
        } else {
            next(error);
        }
    }
});

export { hardwareComponentsRouter };
