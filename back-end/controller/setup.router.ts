import express, { NextFunction, Request, Response } from 'express';
import SetupService from '../service/setup.service';

const setupRouter = express.Router();

// Get all setups or get setup by id using query parameter
setupRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.query.id;
        if (id) {
            // If id is provided as query parameter
            const setup = await SetupService.getSetupById(Number(id));
            if (setup) {
                res.status(200).json(setup);
            } else {
                res.status(404).json({ message: 'Setup not found.' });
            }
        } else {
            // If no id is provided, get all setups
            const setups = await SetupService.getAllSetups();
            res.status(200).json(setups);
        }
    } catch (error) {
        next(error);
    }
});

// Get setup by id using URL parameter
setupRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const setup = await SetupService.getSetupById(Number(req.params.id));
        if (setup) {
            res.status(200).json(setup);
        } else {
            res.status(404).json({ message: 'Setup not found.' });
        }
    } catch (error) {
        next(error);
    }
});

export { setupRouter };
