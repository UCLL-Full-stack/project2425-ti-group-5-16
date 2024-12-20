/**
 * @swagger
 *   components:
 *     schemas:
 *       Comment:
 *         type: object
 *         required:
 *           - userId
 *           - setupId
 *           - content
 *         properties:
 *           id:
 *             type: number
 *             description: The auto-generated id of the comment
 *           userId:
 *             type: number
 *             description: The id of the user who made the comment
 *           setupId:
 *             type: number
 *             description: The id of the setup being commented on
 *           content:
 *             type: string
 *             description: The content of the comment
 *           createdAt:
 *             type: string
 *             format: date-time
 *             description: The timestamp when the comment was created
 *         example:
 *           id: 1
 *           userId: 1
 *           setupId: 1
 *           content: "This is a great setup!"
 *           createdAt: "2023-08-17T12:00:00Z"
 *
 *       CommentInput:
 *         type: object
 *         required:
 *           - content
 *           - setupId
 *         properties:
 *           content:
 *             type: string
 *             description: The content of the comment
 *           setupId:
 *             type: number
 *             description: The id of the setup to comment on
 *         example:
 *           content: "This is a great setup!"
 *           setupId: 1
 *
 *       CommentUpdate:
 *         type: object
 *         required:
 *           - content
 *         properties:
 *           content:
 *             type: string
 *             description: The updated content of the comment
 *         example:
 *           content: "Updated comment content"
 *
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management API
 *
 * @swagger
 * /comments:
 *   get:
 *     summary: Returns all comments
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       500:
 *         description: Server error
 *
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentInput'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Setup or User not found
 *       409:
 *         description: User has already commented on this setup
 *
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get a comment by id
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Comment id
 *     responses:
 *       200:
 *         description: The comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentUpdate'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - user doesn't own this comment
 *       404:
 *         description: Comment not found
 *
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: /comments/{id}
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Comment id
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - user doesn't own this comment
 *       404:
 *         description: Comment not found
 */

// src/controller/comment.router.ts
import express, { NextFunction, Request, Response } from 'express';
import commentService from '../service/comment.service';
import userService from '../service/user.service';
import jwt from 'jsonwebtoken';
import { Role, AuthRequest } from '../types';

const commentRouter = express.Router();

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

commentRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await commentService.getAllComments();
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
});

commentRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const comment = await commentService.getCommentById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
});

commentRouter.post(
    '/',
    authenticateToken,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = (req as AuthRequest).auth;
            const user = await userService.getUserByEmail({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const { content, setupId } = req.body;
            const comment = await commentService.createComment({
                content,
                setup_id: setupId,
                user_id: user.getId(),
            });

            res.status(201).json(comment);
        } catch (error) {
            next(error);
        }
    }
);

commentRouter.put(
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

            const comment = await commentService.getCommentById(id);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }

            if (comment.getUserID() !== user.getId() && role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to update this comment' });
            }

            const updatedComment = await commentService.updateComment(id, req.body.content);
            res.status(200).json(updatedComment);
        } catch (error) {
            next(error);
        }
    }
);

commentRouter.delete(
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

            const comment = await commentService.getCommentById(id);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }

            if (comment.getUserID() !== user.getId() && role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to delete this comment' });
            }

            await commentService.deleteComment(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
);

export { commentRouter };
