// src/controller/comment.router.ts
import express, { Request, Response, NextFunction } from 'express';
import commentService from '../service/comment.service';

const commentRouter = express.Router();

// Get all comments
commentRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.query.id;
        if (id) {
            // If id is provided as query parameter
            const comment = await commentService.getCommentById(Number(id));
            if (comment) {
                res.status(200).json(comment);
            } else {
                res.status(404).json({ message: 'Comment not found.' });
            }
        } else {
            // If no id is provided, get all comments
            const comments = await commentService.getAllComments();
            res.status(200).json(comments);
        }
    } catch (error) {
        next(error);
    }
});

commentRouter.get('/:id', async (req, res, next) => {
    try {
        const comment = await commentService.getCommentById(Number(req.params.id));
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        next(error);
    }
});

/*


// Create comment
commentRouter.post('/', async (req, res, next) => {
    try {
        const { setupId, content } = req.body;
        const userId = req.auth?.id; // Get user ID from JWT token

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const comment = await commentService.createComment({
            userId,
            setupId,
            content,
        });
        res.status(201).json(comment.toJSON());
    } catch (error) {
        next(error);
    }
});

// Update comment
commentRouter.put('/:id', async (req, res, next) => {
    try {
        const { content } = req.body;
        const userId = req.auth?.id; // Get user ID from JWT token

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const comment = await commentService.updateComment(
            Number(req.params.id),
            content,
            userId
        );
        res.json(comment?.toJSON());
    } catch (error) {
        next(error);
    }
});

// Delete comment
commentRouter.delete('/:id', async (req, res, next) => {
    try {
        const userId = req.auth?.id; // Get user ID from JWT token

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await commentService.deleteComment(Number(req.params.id), userId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});*/

export { commentRouter };
