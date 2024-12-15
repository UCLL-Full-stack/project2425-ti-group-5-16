import express, { NextFunction, Request, Response } from 'express';
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

export { commentRouter };
