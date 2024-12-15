import { Comment } from '../model/comment';

import database from './database';

const getAllComments = async (): Promise<Comment[]> => {
    try {
        const commentsPrisma = await database.comment.findMany();
        return commentsPrisma.map((commentPrisma) => Comment.from(commentPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllComments,
};
