/*import { Comment } from '../model/comment';
import { Setup } from '../model/setup';
import { User } from '../model/user';
import commentDB from '../repository/comments.db';
import setupDB from '../repository/setup.db';
import userDB from '../repository/user.db';
import { CommentInput } from '../types';

const getAllComments = (): Comment[] => {
    return commentDB.getAllComments();
};

const getCommentById = (comment_id: number): Comment => {
    return commentDB.getCommentById(comment_id);
};

const getCommentsBySetupId = (setup_id: number): Comment[] => {
    return commentDB.getCommentsBySetupId(setup_id);
};

const addComment = ({ setup_id, user_id, content }: CommentInput): Comment => {
    // BASIC VALIDATION

    if (!setup_id) {
        throw new Error('Setup ID is required');
    }
    if (!user_id) {
        throw new Error('User ID is required');
    }
    if (!content) {
        throw new Error('Content is required');
    }

    // GENERATE A UNIQUE COMMENT ID
    const comment_id = commentDB.generateUniqueSetupId();

    // GET THE SETUP OBJECT USING THE ID
    const setup = setupDB.getSetupById(Id);
    if (!setup) {
        throw new Error('Setup not found');
    }

    // GET THE USER OBJECT USING THE ID
    const user = userDB.getUserById({ id: user_id });
    if (!user) {
        throw new Error('User not found');
    }

    const newComment = new Comment({
        comment_id,
        setup_id,
        user_id,
        content,
    });

    commentDB.addComment(newComment);
    setup.addComment(newComment); // Add the comment to the setup

    return newComment;
};

const updateComment = (comment_id: number, content: string): Comment => {
    return commentDB.updateComment(comment_id, content);
};

const deleteComment = (comment_id: number): void => {
    commentDB.deleteComment(comment_id);
};

export default {
    addComment,
    getAllComments,
    getCommentById,
    getCommentsBySetupId,
    updateComment,
    deleteComment,
};
*/
