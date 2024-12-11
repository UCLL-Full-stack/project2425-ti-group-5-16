import { Comment } from '../model/comment';

// Mock comments
const mockComment1 = new Comment({
    comment_id: 1,
    setup_id: 1,
    user_id: 1,
    content: 'Great setup!',
});

const mockComment2 = new Comment({
    comment_id: 2,
    setup_id: 2,
    user_id: 2,
    content: 'I love this setup!',
});

const commentDB: Comment[] = [mockComment1, mockComment2];

const getAllComments = (): Comment[] => {
    return commentDB;
};

const getCommentById = (comment_id: number): Comment => {
    const comment = commentDB.find((comment) => comment.getCommentID() === comment_id);
    if (!comment) {
        throw new Error(`Comment with id ${comment_id} not found`);
    }
    return comment;
};

const getCommentsBySetupId = (setup_id: number): Comment[] => {
    return commentDB.filter((comment) => comment.getSetupID() === setup_id);
};

const addComment = (comment: Comment): void => {
    commentDB.push(comment);
};

const updateComment = (comment_id: number, content: string): Comment => {
    const comment = getCommentById(comment_id);
    comment.setContent(content);
    return comment;
};

const generateUniqueSetupId = (): number => {
    const comments = getAllComments();
    if (comments.length === 0) return 1;
    const highestId = Math.max(...comments.map((comment) => comment.setup_id));
    return highestId + 1;
};

const deleteComment = (comment_id: number): void => {
    const index = commentDB.findIndex((comment) => comment.getCommentID() === comment_id);
    if (index === -1) {
        throw new Error(`Comment with id ${comment_id} not found`);
    }
    commentDB.splice(index, 1);
};

export default {
    getAllComments,
    getCommentById,
    getCommentsBySetupId,
    addComment,
    updateComment,
    generateUniqueSetupId,
    deleteComment,
};
