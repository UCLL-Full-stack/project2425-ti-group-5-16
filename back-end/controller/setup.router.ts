import express, { NextFunction, Response } from 'express';
import setupService from '../service/setup.service';
import { Request } from 'express-jwt';
import { SetupInput } from '../types';

const setupRouter = express.Router();
/*
// Get all setups or get setup by id using query parameter
setupRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.query.id;
        if (id) {
            // If id is provided as query parameter
            const setup = await setupService.getSetupById(Number(id));
            if (setup) {
                res.status(200).json(setup);
            } else {
                res.status(404).json({ message: 'Setup not found.' });
            }
        } else {
            // If no id is provided, get all setups
            const setups = await setupService.getAllSetups();
            res.status(200).json(setups);
        }
    } catch (error) {
        next(error);
    }
});
*/
// Get setup by id using URL parameter
setupRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const setup = await setupService.getSetupById(Number(req.params.id));
        if (setup) {
            res.status(200).json(setup);
        } else {
            res.status(404).json({ message: 'Setup not found.' });
        }
    } catch (error) {
        next(error);
    }
});

setupRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.query.email;
        if (email) {
            // If id is provided as query parameter
            const setup = await setupService.getSetupByEmail({ email: String(email) });
            if (setup) {
                res.status(200).json(setup);
            } else {
                res.status(404).json({ message: 'Comment not found.' });
            }
        } else {
            // If no id is provided, get all setups
            const comments = await setupService.getAllSetups();
            res.status(200).json(comments);
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /setups:
 *   post:
 *     summary: Create a setup
 *     tags:
 *       - Setups
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SetupInput'
 *     responses:
 *       200:
 *         description: The created setup object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Setup'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/*
setupRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const setupInput = <SetupInput>req.body;
        const setup = await setupService.createSetup(setupInput);
        res.status(200).json(setup);
    } catch (error) {
        next(error);
    }
});

*/

/*
// Create setup
setupRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = req.query.role;
        const setupData = <SetupInput>req.body;
        if (!role) {
            return res.status(400).json({ message: 'Email and role are required.' });
        }

        const newSetup = await setupService.createSetup(setupData);
        res.status(201).json(newSetup);
    } catch (error) {
        next(error);
    }
});
*/
/*
setupRouter.post('/by-email',async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const { email, role } = req.auth;
        const setups = await setupService.getsetupByEmail(email,role);
        res.status(200).json(comments);
setupRouter.post('/', authenticateToken, async (req: AuthenticatedRequest, res, next) => {
        next(error);
    }
}
);
*/
export { setupRouter };
