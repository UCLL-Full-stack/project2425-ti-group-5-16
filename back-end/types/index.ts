type Role = 'admin' | 'user';

type UserInput = {
    id?: number; // Make id optional
    email: string;
    password: string;
    name: string;
    age: number;
    role: Role;
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

type ImageInput = {
    url: string;
    details: string;
};

export {ImageInput, Role, SetupInput, UserInput, CommentInput };

// testing phaze

type AuthenticationResponse = {
    token: string;
    name: string;
    role: string;
};

export { AuthenticationResponse };