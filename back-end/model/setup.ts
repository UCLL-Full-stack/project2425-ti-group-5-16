import { Hardware_Components } from "./hardware_components";
import { Images } from "./images";
import { User } from "./user";

export class Setup {
    readonly setup_id: number; // Primary key // ID OF SETUP CANT BE CHANGED => READONLY
    readonly owner: User; // Foreign key // OWNER OF SETUP CANT BE CHANGED => READONLY
    private hardware_components: Hardware_Components[]; // Foreign key
    private image_urls: Images[]; // Forein key
    private details: String;             
    private last_updated: Date;           
    
    constructor(
        setup: {
            setup_id: number; // PK
            owner: User; // FK
            hardware_components: Hardware_Components[]; // FK
            image_urls: Images[]; // FK
            details: String;
            last_updated: Date;
        }
    ) { 
        this.setup_id = setup.setup_id;
        this.owner= setup.owner;  
        this.hardware_components = setup.hardware_components;     
        this.image_urls = setup.image_urls;
        this.details = setup.details;
        this.last_updated = setup.last_updated; 
    }

    // GETTERS

    // refrence to the user class
    public getOwnerID(): number {
        return this.owner.getId();
    }
    // refrence to the hardware_components class
    public getHardwareComponents(): Hardware_Components[] {
        return this.hardware_components;
    }
    // refrence to the images class
    public getImageUrls(): Images[] {
        return this.image_urls;
    }

    // ----------------------------
    public getSetupID(): number {
        return this.setup_id;
    }
    public getDetails(): String {
        return this.details;
    }
    public getLastUpdated(): Date {
        return this.last_updated;
    }
    // ----------------------------

    // SETTERS

    public setDetails(details: String): void {
        this.details = details;
    }

    public setLastUpdated(last_updated: Date): void {
        this.last_updated = last_updated;
    }

    // ADDERS

    public addImageUrl(image: Images): void {
        if (this.image_urls.includes(image)) {
            throw new Error("Image already exists in the list");
        }
        this.image_urls.push(image);
    }

    public addHardwareComponent(hardware_component: Hardware_Components): void {
        if (this.hardware_components.includes(hardware_component)) {
            throw new Error("Hardware component already exists in the list");
        }
        this.hardware_components.push(hardware_component);
    }
}

