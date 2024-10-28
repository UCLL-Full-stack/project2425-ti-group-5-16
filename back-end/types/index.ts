type UserInput = {
    id?: number;
    email: string;
    password: string;
    name: string;
    age: number;
};

type CommentInput = {
    comment_id: number;
    setup_id: number;
    user_id: number;
    content: string;
};

type SetupInput = {
    setup_id: number;
    owner: UserInput;
    hardware_components: string[];
    image_urls: string[];
    details: string;
    last_updated: Date;
};

export { SetupInput, UserInput, CommentInput };

type ImageInput = {
    url: string;
    details: string;
};

export { ImageInput };
