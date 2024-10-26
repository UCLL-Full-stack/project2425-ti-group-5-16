type UserInput = {
};

type SetupInput = {
    setupid: string;
    owner: UserInput;
    hardware_components: string[];
    image_urls: string[];
    details: string;
    last_updated: Date;
};