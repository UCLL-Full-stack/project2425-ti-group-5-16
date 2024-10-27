import express, {NextFunction, Request, Response} from 'express';
import SetupService  from '../service/setup.service';

const setupRouter = express.Router();

setupRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const setup = await SetupService.getAllSetups();
        res.status(200).json(setup);
    } catch (error) {
        next(error);
    }
});

setupRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const setup = await SetupService.getSetupById(parseInt(req.params.id));
        res.status(200).json(setup);
    } catch (error) {
        next(error);
    }
});

setupRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const setup = await SetupService.addSetup(req.body);
        res.status(200).json(setup);
    } catch (error) {
        next(error);
    }
});

export { setupRouter };