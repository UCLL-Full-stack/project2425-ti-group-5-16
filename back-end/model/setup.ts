import { User } from './user';
import { Image } from './image';
import { Comment } from './comment';
import { HardwareComponent } from './hardwareComponent';

// Import Prisma models

import {
    User as UserPrisma,
    HardwareComponent as HardwareComponentPrisma,
    Image as ImagesPrisma,
    Comment as CommentPrisma,
    Setup as SetupPrisma,
} from '@prisma/client';

export class Setup {
    private id?: number;
    private ownerId: number; // Add this field
    private owner: User;
    private hardware_components: HardwareComponent[];
    private images: Image[];
    private details: string;
    private lastUpdated: Date;
    private comments: Comment[];

    constructor(setup: {
        id?: number;
        ownerId: number;
        owner: User;
        hardware_components: HardwareComponent[];
        images: Image[];
        details: string;
        lastUpdated: Date;
        comments: Comment[];
    }) {
        this.validate(setup);
        this.id = setup.id;
        this.ownerId = setup.ownerId;
        this.owner = setup.owner;
        this.hardware_components = setup.hardware_components;
        this.images = setup.images;
        this.details = setup.details;
        this.lastUpdated = setup.lastUpdated;
        this.comments = setup.comments;
    }

    validate(setup: {
        id?: number;
        ownerId: number;
        owner: User;
        hardware_components: HardwareComponent[];
        images: Image[];
        details: String;
        lastUpdated: Date;
        comments?: Comment[];
    }) {
        if (setup.id !== undefined && setup.id < 0) {
            throw new Error('Setup ID must be a non-negative number');
        }
        if (typeof setup.ownerId !== 'number' || setup.ownerId <= 0) {
            throw new Error('Setup ownerId must be a positive number');
        }
        if (setup.lastUpdated.getTime() > Date.now()) {
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
    public getHardwareComponents(): HardwareComponent[] {
        return this.hardware_components ? [...this.hardware_components] : []; // Return a copy to maintain immutability
    }

    /**
     * Returns the image URLs associated with the setup.
     * @returns {Image[]} The image URLs associated with the setup.
     */
    public getImageUrls(): Image[] {
        return this.images ? [...this.images] : []; // Return a copy to maintain immutability
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
        const lastUpdated = this.lastUpdated;
        if (lastUpdated === undefined) {
            throw new Error('Last updated date is undefined');
        }
        return this.lastUpdated;
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

    public setDetails(details: string): void {
        this.details = details;
    }

    public setLastUpdated(lastUpdated: Date): void {
        this.lastUpdated = lastUpdated;
    }

    // ADDERS

    public addImageUrl(image: Image): void {
        if (this.images.includes(image)) {
            throw new Error('Image already exists in the list');
        }
        this.images.push(image);
    }

    public addHardwareComponent(hardware_component: HardwareComponent): void {
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

    static from({
        id,
        ownerId,
        owner,
        hardware_components,
        images,
        details,
        lastUpdated,
        comments,
    }: SetupPrisma & {
        comments: CommentPrisma[];
        images: ImagesPrisma;
        owner: UserPrisma;
    }): Setup {
        return new Setup({
            id,
            ownerId,
            owner,
            hardware_components,
            images,
            details,
            lastUpdated,
            comments,
        });
    }
}
