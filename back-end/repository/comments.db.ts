import { Comment } from '../model/comment';
import { User } from '../model/user';
import { Setup } from '../model/setup';

// Mock users
const mockUser1 = new User({
    id: 1,
    email: 'janny-smith@gmail.com',
    password: 'password1',
    name: 'Janny Smith',
    age: 25,
});

const mockUser2 = new User({
    id: 2,
    email: 'richard-domer@gmail.com',
    password: 'password2',
    name: 'Richard Domer',
    age: 30,
});

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

const mockComment3 = new Comment({
    comment_id: 3,
    setup_id: 3,
    user_id: 2,
    content: 'Amazing setup!',
});

// Mock setups
const mockSetup1 = new Setup({
    setup_id: 1,
    owner: mockUser1,
    hardware_components: [],
    image_urls: [],
    details: 'This is test setup 1',
    last_updated: new Date('2023-01-01'),
    comments: [mockComment1],
});

const mockSetup2 = new Setup({
    setup_id: 2,
    owner: mockUser2,
    hardware_components: [],
    image_urls: [],
    details: 'This is test setup 2',
    last_updated: new Date('2024-01-01'),
});

const mockSetup3 = new Setup({
    setup_id: 3,
    owner: mockUser1,
    hardware_components: [],
    image_urls: [],
    details: 'This is test setup 3',
    last_updated: new Date('2025-01-01'),
    comments: [mockComment3, mockComment2],
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
    deleteComment,
};
