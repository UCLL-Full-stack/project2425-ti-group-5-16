import commentDB from '../repository/comments.db';
import { Comment } from '../model/comment';

const getAllComments = async (): Promise<Comment[]> => {
    const comments = await commentDB.getAllComments();
    return comments;
};

const getCommentById = async (id: number): Promise<Comment | null> => {
    return await commentDB.getCommentById(id);
};

const createComment = async (comment: {
    userId: number;
    setupId: number;
    content: string;
}): Promise<Comment> => {
    return await commentDB.createComment(comment);
};

const updateComment = async (
    id: number,
    content: string,
    userId: number
): Promise<Comment | null> => {
    const comment = await commentDB.getCommentById(id);
    if (!comment) {
        throw new Error('Comment not found');
    }
    if (comment.getUserID() !== userId) {
        throw new Error('Unauthorized to update this comment');
    }
    return await commentDB.updateComment(id, content);
};

const deleteComment = async (id: number, userId: number): Promise<void> => {
    const comment = await commentDB.getCommentById(id);
    if (!comment) {
        throw new Error('Comment not found');
    }
    if (comment.getUserID() !== userId) {
        throw new Error('Unauthorized to delete this comment');
    }
    await commentDB.deleteComment(id);
};

export default {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
};
