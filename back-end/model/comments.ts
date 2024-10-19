import { User } from './user';
import { Setup } from './setup'; 

export class comments {
    readonly comment_id: number; // Primary key // COMMENT ID CANT BE CHANGED
    private user: User; // Foreign key
    private setup: Setup; // Foreign key
    readonly details: string; // COMMENT CANT BE CHANGED

    constructor(comment: {
        comment_id: number;
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

    // SETTERS

    setUserid(user: User): void {
        this.user = user;
    }

    setSetupId(setup: Setup): void {
        this.setup = setup;
    }


}
