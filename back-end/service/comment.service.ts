import commentDB from '../repository/comments.db';
import { Comment } from '../model/comment';
import { CommentInput, Role, SetupInput, UserInput } from '../types';
import setupDb from '../repository/setup.db';
import { UnauthorizedError } from 'express-jwt';

const getAllComments = async (): Promise<Comment[]> => {
    const comments = await commentDB.getAllComments();
    return comments;
};
/*
const getComment = async ({email,role}): Promise<Comment[]> => {
    if (role === "admin") {
        return commentDB.getAllComments();
    }else if (role === "user") {
        return commentDB.getCommentForEmail({email});
    }
    else {
        throw new UnauthorizedError('credentials_required',{
            message:'you are not authorized to view this comment',
        });
    }

    };

const getCommentById = async (id: number): Promise<Comment | null> => {
    return await commentDB.getCommentById(id);
};

*/ /*
const createComment = async ( {
    content,
    Setup: SetupInput,
    User: UserInput,
}: CommentInput): Promise<Comment> => {
    const Setup = await setupDb.getSetupById({ id : SetupInput.id });
    const User = await userDb.getUserById({id : UserInput.id});
    if (!Setup) {
        throw new Error('Setup not found');
    }
    if (!User) {
        throw new Error('User not found');
    }
    const existingComment = await commentDB.getCommentBySetupAndUser({
        setupId: Setup.getId(),
        userId: User.getId(),
    });
    if (existingComment) {
        throw new Error('Comment already exists');
    }
    const setupId = Setup.getId();
    const userId = User.getUserID();
    if (setupId === undefined) {
        throw new Error('Setup ID is undefined');
    }
    if (userId === undefined) {
        throw new Error('User ID is undefined');
    }
    const comment = new Comment({content, setupId, userId});
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
*/
export default {
    getAllComments,
};
