/**
 * @swagger
 *   components:
 *     schemas:
 *       Setup:
 *         type: object
 *         required:
 *           - id
 *           - ownerId
 *           - details
 *           - lastUpdated
 *         properties:
 *           id:
 *             type: number
 *             description: The auto-generated id of the setup
 *           ownerId:
 *             type: number
 *             description: ID of the user who owns this setup
 *           owner:
 *             $ref: '#/components/schemas/User'
 *           hardwareComponents:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/HardwareComponent'
 *           images:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Image'
 *           details:
 *             type: string
 *             description: Description of the setup
 *           lastUpdated:
 *             type: string
 *             format: date-time
 *           comments:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Comment'
 *         example:
 *           id: 1
 *           ownerId: 1
 *           details: "Gaming setup with RGB lighting"
 *           lastUpdated: "2023-08-17T12:00:00Z"
 *           hardwareComponents: []
 *           images: []
 *           comments: []
 *
 *       User:
 *         type: object
 *         required:
 *           - id
 *           - email
 *           - name
 *           - role
 *           - age
 *         properties:
 *           id:
 *             type: number
 *           email:
 *             type: string
 *           name:
 *             type: string
 *           role:
 *             type: string
 *             enum: [admin, user, guest]
 *           age:
 *             type: number
 *
 *       HardwareComponent:
 *         type: object
 *         required:
 *           - id
 *           - name
 *           - details
 *           - price
 *         properties:
 *           id:
 *             type: number
 *           name:
 *             type: string
 *           details:
 *             type: string
 *           price:
 *             type: number
 *             format: float
 *
 *       Image:
 *         type: object
 *         required:
 *           - id
 *           - url
 *           - details
 *         properties:
 *           id:
 *             type: number
 *           url:
 *             type: string
 *           details:
 *             type: string
 *
 *       SetupInput:
 *         type: object
 *         required:
 *           - details
 *         properties:
 *           details:
 *             type: string
 *           hardwareComponentIds:
 *             type: array
 *             items:
 *               type: number
 *           imageIds:
 *             type: array
 *             items:
 *               type: number
 *
 *       SetupUpdateData:
 *         type: object
 *         properties:
 *           details:
 *             type: string
 *           hardwareComponents:
 *             type: array
 *             items:
 *               type: number
 *           images:
 *             type: array
 *             items:
 *               type: number
 *
 * @swagger
 * tags:
 *   name: Setups
 *   description: Setup management API
 *
 * @swagger
 * /setup:
 *   get:
 *     summary: Get all setups
 *     tags: [Setups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all setups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Setup'
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     summary: Create a new setup
 *     tags: [Setups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SetupInput'
 *     responses:
 *       201:
 *         description: Setup created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Setup'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Referenced components/images not found
 *
 * @swagger
 * /setup/my:
 *   get:
 *     summary: Get user's setups
 *     tags: [Setups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's setups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Setup'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *
 * @swagger
 * /setup/{id}:
 *   get:
 *     summary: Get setup by ID
 *     tags: [Setups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The setup details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Setup'
 *       404:
 *         description: Setup not found
 *
 *   put:
 *     summary: Update a setup
 *     tags: [Setups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SetupUpdateData'
 *     responses:
 *       200:
 *         description: Setup updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Setup'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - user doesn't own this setup
 *       404:
 *         description: Setup not found
 *
 *   delete:
 *     summary: Delete a setup
 *     tags: [Setups]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *         description: Setup deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - user doesn't own this setup
 *       404:
 *         description: Setup not found
 */

import express, { NextFunction, Request, Response } from 'express';
import setupService from '../service/setup.service';
import userService from '../service/user.service';
import jwt from 'jsonwebtoken';
import { Role, SetupInput, SetupUpdateData, AuthRequest } from '../types';

const setupRouter = express.Router();

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token required' });
    }

    try {
        const auth = jwt.verify(token, process.env.JWT_SECRET!) as { email: string; role: Role };
        (req as AuthRequest).auth = auth;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

setupRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const setups = await setupService.getAllSetups();
        res.status(200).json(setups);
    } catch (error) {
        next(error);
    }
});

setupRouter.get(
    '/my',
    authenticateToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = (req as AuthRequest).auth;
            const user = await userService.getUserByEmail({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const setups = await setupService.getSetupsByOwnerId({ ownerId: user.getId() });
            res.status(200).json(setups);
        } catch (error) {
            next(error);
        }
    }
);

setupRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const setup = await setupService.getSetupById({ id });
        if (!setup) {
            return res.status(404).json({ message: 'Setup not found' });
        }
        res.status(200).json(setup);
    } catch (error) {
        next(error);
    }
});

setupRouter.post(
    '/',
    authenticateToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = (req as AuthRequest).auth;
            const user = await userService.getUserByEmail({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const setupInput: SetupInput = {
                ownerId: user.getId(),
                details: req.body.details,
                hardwareComponentIds: req.body.hardwareComponentIds,
                imageIds: req.body.imageIds,
            };

            const setup = await setupService.createSetup(setupInput);
            res.status(201).json(setup);
        } catch (error) {
            next(error);
        }
    }
);

setupRouter.put(
    '/:id',
    authenticateToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id);
            const { email, role } = (req as AuthRequest).auth;
            const user = await userService.getUserByEmail({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const existingSetup = await setupService.getSetupById({ id });
            if (!existingSetup) {
                return res.status(404).json({ message: 'Setup not found' });
            }

            if (existingSetup.getOwnerId() !== user.getId() && role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to update this setup' });
            }

            // Transform the request body to match SetupUpdateData
            const setupData: SetupUpdateData = {
                details: req.body.details,
                hardwareComponents: req.body.hardwareComponents, // Map from request body
                images: req.body.images, // Map from request body
            };

            const updatedSetup = await setupService.updateSetup(id, setupData);
            res.status(200).json(updatedSetup);
        } catch (error) {
            next(error);
        }
    }
);

setupRouter.delete(
    '/:id',
    authenticateToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id);
            const { email, role } = (req as AuthRequest).auth;
            const user = await userService.getUserByEmail({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const existingSetup = await setupService.getSetupById({ id });
            if (!existingSetup) {
                return res.status(404).json({ message: 'Setup not found' });
            }

            if (existingSetup.getOwnerId() !== user.getId() && role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to delete this setup' });
            }

            await setupService.deleteSetup({ id });
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
);

export { setupRouter };
