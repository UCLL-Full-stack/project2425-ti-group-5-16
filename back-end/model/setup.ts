import { Hardware_Components } from "./hardware_components";
import { images } from "./images";

export class Setup {
    readonly owner_id: number;
    readonly details: String;
    readonly image_urls: images[];
    readonly last_updated: Date;
    readonly hardware_components: Hardware_Components[];
    readonly setup_id?: number;

    constructor(
        setup: {
            owner_id: number;
            details: String;
            image_urls: images[];
            last_updated: Date;
            hardware_components: Hardware_Components[];
            setup_id?: number;
        }
    ) {
        this.owner_id = setup.owner_id;
        this.details = setup.details;
        this.image_urls = setup.image_urls;
        this.last_updated = setup.last_updated;
        this.hardware_components = setup.hardware_components;
        this.setup_id = setup.setup_id;
    }
}

