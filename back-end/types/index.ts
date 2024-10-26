type UserInput = {
    id?: number;
    email: string;
    password: string;
    name: string;
    age: number;
};

type SetupInput = {
    setup_id: number;
    owner: UserInput;
    hardware_components: string[];
    image_urls: string[];
    details: string;
    last_updated: Date;
};

export { SetupInput, UserInput };