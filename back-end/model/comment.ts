import { User } from './user';  // Importing the User class
import { Setup } from './setup';  // Importing the Setup class
export class Comment {
    readonly comment_id?: number;
    readonly user: User;         // Foreign key: reference to the User class
    readonly setup: Setup;   // Foreign key: reference to the Setup (assuming Setup has a number ID)
    readonly details: string;    // Content of the comment

    constructor(comment: {
        comment_id?: number;
        user: User;
        setup: Setup;
        details: string;
    }) {
        this.comment_id = comment.comment_id;
        this.user = comment.user;
        this.setup = comment.setup;
        this.details = comment.details;
    }

    getCommentId(): number | undefined {
        return this.comment_id;
    }

    getUser(): User {
        return this.user;
    }

    getSetupId(): Setup {
        return this.setup;
    }

    getDetails(): string {
        return this.details;
    }

    equals(comment: Comment): boolean {
        return (
            this.user.equals(comment.getUser()) &&   // Using the User's equals method
            this.setup === comment.getSetupId() &&
            this.details === comment.getDetails()
        );
    }
}
