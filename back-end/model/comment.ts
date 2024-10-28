import { Setup } from './setup';
import { User } from './user';

export class Comment {
    readonly comment_id: number; // Primary key // READONLY = key cannot be changed
    readonly setup_id: number; // Foreign key // READONLY = key cannot be changed
    readonly user_id: number; // Foreign key // READONLY = key cannot be changed
    private content: string;

    constructor(comment: {
        comment_id: number;
        setup_id: number;
        user_id: number;
        content: string;
    }) {
        this.comment_id = comment.comment_id;
        this.setup_id = comment.setup_id;
        this.user_id = comment.user_id;
        this.content = comment.content;
    }

    // GETTERS

    /**
     * Returns the comment ID.
     * @returns {number} The comment ID.
     */
    public getCommentID(): number {
        return this.comment_id;
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

    // SETTERS

    /**
     * Sets the content of the comment.
     * @param {string} content - The new content of the comment.
     */
    public setContent(content: string): void {
        this.content = content;
    }
}
