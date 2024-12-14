import { User } from './user';
import { Hardware_Components } from './hardware_components';
import { Images } from './images';
import { Comment } from './comment';

import {
    User as UserPrisma,
    HardwareComponent as HardwareComponentPrisma,
    Image as ImagesPrisma,
    Comment as CommentPrisma,
    Setup as SetupPrisma,
} from '@prisma/client';

export class Setup {
    private id?: number; // Primary key // ID OF SETUP CANT BE CHANGED => READONLY
    private owner: User; // Foreign key // OWNER OF SETUP CANT BE CHANGED => READONLY
    private hardware_components: Hardware_Components[]; // Foreign key
    private image_urls: Images[]; // Forein key
    private details: String;
    private last_updated: Date;
    private comments: Comment[]; // New property to store comments

    constructor(setup: {
        id?: number; // PK
        owner: User; // FK
        hardware_components: Hardware_Components[]; // FK
        image_urls: Images[]; // FK
        details: String;
        last_updated: Date;
        comments: Comment[]; // Optional parameter for comments
    }) {
        this.validate(setup);
        this.id = setup.id;
        this.owner = setup.owner;
        this.hardware_components = setup.hardware_components || []; // Initialize hardware_components array
        this.image_urls = setup.image_urls || []; // Initialize image_urls array
        this.details = setup.details;
        this.last_updated = setup.last_updated;
        this.comments = setup.comments || []; // Initialize comments array
    }

    validate(setup: {
        id?: number;
        owner: User;
        hardware_components: Hardware_Components[];
        image_urls: Images[];
        details: String;
        last_updated: Date;
        comments?: Comment[];
    }) {
        if (setup.id !== undefined && setup.id < 0) {
            throw new Error('Setup ID must be a non-negative number');
        }
        if (setup.owner.getRole() !== setup.owner.getRole()) {
            throw new Error('Setup owner must be a user');
        }
        if (setup.last_updated.getTime() > Date.now()) {
            throw new Error('Last updated date must not be in the future');
        }
    }

    getId(): number | undefined {
        const id = this.id;
        if (id === undefined) {
            throw new Error('ID is undefined');
        }
        return this.id;
    }

    getOwner(): User {
        const ownerId = this.owner.getId();
        if (ownerId === undefined) {
            throw new Error('Owner ID is undefined');
        }
        return this.owner;
    }

    // refrence to the user class
    public getOwnerID(): number {
        const ownerId = this.owner.getId();
        if (ownerId === undefined) {
            throw new Error('Owner ID is undefined');
        }
        return ownerId;
    }
    // refrence to the hardware_components class
    /**
     * Returns the hardware components associated with the setup.
     * @returns {Hardware_Components[]} The hardware components associated with the setup.
     */
    public getHardwareComponents(): Hardware_Components[] {
        return this.hardware_components ? [...this.hardware_components] : []; // Return a copy to maintain immutability
    }

    /**
     * Returns the image URLs associated with the setup.
     * @returns {Images[]} The image URLs associated with the setup.
     */
    public getImageUrls(): Images[] {
        return this.image_urls ? [...this.image_urls] : []; // Return a copy to maintain immutability
    }

    // ----------------------------

    public getDetails(): String {
        const details = this.details;
        if (details === undefined) {
            throw new Error('Details are undefined');
        }
        return this.details;
    }
    public getLastUpdated(): Date {
        const last_updated = this.last_updated;
        if (last_updated === undefined) {
            throw new Error('Last updated date is undefined');
        }
        return this.last_updated;
    }

    /**
     * Returns the comments associated with the setup.
     * @returns {Comment[]} The comments associated with the setup.
     */
    public getComments(): Comment[] {
        return this.comments ? [...this.comments] : []; // Return a copy to maintain immutability
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
            throw new Error('Image already exists in the list');
        }
        this.image_urls.push(image);
    }

    public addHardwareComponent(hardware_component: Hardware_Components): void {
        if (this.hardware_components.includes(hardware_component)) {
            throw new Error('Hardware component already exists in the list');
        }
        this.hardware_components.push(hardware_component);
    }

    /**
     * Adds a comment to the setup.
     * @param {Comment} comment - The comment to add.
     * @throws {Error} If the comment already exists in the list.
     */
    public addComment(comment: Comment): void {
        if (this.comments && this.comments.includes(comment)) {
            throw new Error('Comment already exists in the list');
        }
        this.comments.push(comment);
    }

    static from(setupPrisma: SetupPrisma): Setup {
        return new Setup({
            id: setupPrisma.id,
            owner: User.from(setupPrisma.owner),
            hardware_components: setupPrisma.hardwareComponents.map(Hardware_Components.from),
            image_urls: setupPrisma.images.map(Images.from),
            details: setupPrisma.details,
            last_updated: setupPrisma.lastUpdated,
            comments: setupPrisma.comments.map(Comment.from),
        });
    }
}
