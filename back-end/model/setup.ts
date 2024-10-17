// import { Course } from './course';
//import { user } from './user';

export class Setup {
    readonly owner_id: number;
    readonly details: String;
    readonly image_url: String[];
    readonly last_updated: Date;
    readonly hardware_component: String[];

    constructor(setup: { owner_id: number; details: String; image_url: String[]; last_updated: Date; hardware_component: String[] }) {
        this.owner_id = setup.owner_id;
        this.details = setup.details;
        this.image_url = setup.image_url;
        this.last_updated = setup.last_updated;
        this.hardware_component = setup.hardware_component;
    }
}

