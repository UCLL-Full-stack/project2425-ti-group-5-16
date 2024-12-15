import { Comment } from '../model/comment';
import commentDB from '../repository/comments.db';

import { CommentInput } from '../types';

const getAllComments = async (): Promise<Comment[]> => {
    return commentDB.getAllComments();
};

export default {
    getAllComments,
};
