import { HardwareComponent, Image, User } from '@prisma/client';

type Role = 'admin' | 'user' | 'guest' | 'owner';

type Owner = {
    id: number;
    email: string;
    password: string;
    name: string;
    age: number;
    role: Role;
};

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
    owner: Owner;
    hardwareComponents?: HardwareComponent[];
    images?: Image[];
    details: string;
};

type ImageInput = {
    url: string;
    details: string;
};

type HardwareComponentInput = {
    name: string;
    details: string;
    price: number;
};

export { ImageInput, Role, SetupInput, UserInput, CommentInput, HardwareComponentInput };

// testing phaze

type AuthenticationResponse = {
    token: string;
    email: string;
    role: string;
    username: string;
};

type LoginInput = {
    email: string;
    password: string;
};

export { AuthenticationResponse, LoginInput };
