import { Setup } from './setup';
import { User } from './user';
import { Comment as CommentPrisma, Setup as SetupPrisma, User as UserPrisma } from '@prisma/client';

export class Comment {
    readonly id?: number; // Primary key // READONLY = key cannot be changed
    readonly setup_id: number; // Foreign key // READONLY = key cannot be changed
    readonly user_id: number; // Foreign key // READONLY = key cannot be changed
    private content: string;

    constructor(comment: { id?: number; setup_id: number; user_id: number; content: string }) {
        this.validate(comment);
        this.id = comment.id;
        this.setup_id = comment.setup_id;
        this.user_id = comment.user_id;
        this.content = comment.content;
    }

    // GETTERS

    /**
     * Returns the comment ID.
     * @returns {number} The comment ID.
     */
    public getCommentID(): number | undefined {
        return this.id;
    }

    /**
     * Returns the setup ID.
     * @returns {number} The setup ID.
     */
    public getSetupID(): number {
        return this.setup_id;
    }

    /**
     * Returns the user ID.
     * @returns {number} The user ID.
     */
    public getUserID(): number {
        return this.user_id;
    }

    /**
     * Returns the content of the comment.
     * @returns {string} The content of the comment.
     */
    public getContent(): string {
        return this.content;
    }

    validate(comment: { id?: number; setup_id: number; user_id: number; content: string }) {
        if (!comment.content?.trim()) {
            throw new Error('Content is required');
        }
        if (!comment.setup_id) {
            throw new Error('Setup ID is required');
        }
        if (!comment.user_id) {
            throw new Error('User ID is required');
        }
    }

    // SETTERS

    /**
     * Sets the content of the comment.
     * @param {string} content - The new content of the comment.
     */
    public setContent(content: string): void {
        this.content = content;
    }

    equals(comment: Comment): boolean {
        return (
            this.id === comment.getCommentID() &&
            this.setup_id === comment.getSetupID() &&
            this.user_id === comment.getUserID() &&
            this.content === comment.getContent()
        );
    }

    static from({
        id,
        setup_id,
        user_id,
        content,
    }: CommentPrisma & {
        setup: SetupPrisma;
        user: UserPrisma;
    }) {
        return new Comment({
            id,
            setup_id,
            user_id,
            content,
        });
    }
}
