/*import express, { NextFunction, Request, Response } from 'express';
import CommentService from '../service/comment.service';

const commentRouter = express.Router();

// Get all comments
commentRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await CommentService.getAllComments();
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
});

// Get a comment by ID
commentRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await CommentService.getCommentById(parseInt(req.params.id));
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
});

// Get comments by setup ID
commentRouter.get('/setup/:setup_id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await CommentService.getCommentsBySetupId(parseInt(req.params.setup_id));
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
});

// Create a new comment
commentRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await CommentService.addComment(req.body);
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
});

// Update a comment
commentRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await CommentService.updateComment(
            parseInt(req.params.id),
            req.body.content
        );
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
});

// Delete a comment
commentRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await CommentService.deleteComment(parseInt(req.params.id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export { commentRouter };
*/