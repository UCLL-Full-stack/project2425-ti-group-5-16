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
    HardwareComponentToSetup as HardwareComponentToSetupPrisma,
} from '@prisma/client';

export class Setup {
    private id?: number;
    private ownerId: number; // Add this field
    private owner: User;
    private hardwareComponents: HardwareComponent[]; // Changed from hardware_components
    private images: Image[];
    private details: string;
    private lastUpdated: Date;
    private comments: Comment[];

    constructor(setup: {
        id?: number;
        ownerId: number;
        owner: User;
        hardwareComponents: HardwareComponent[]; // Changed here too
        images: Image[];
        details: string;
        lastUpdated: Date;
        comments: Comment[];
    }) {
        this.validate(setup);
        this.id = setup.id;
        this.ownerId = setup.ownerId;
        this.owner = setup.owner;
        this.details = setup.details;
        this.lastUpdated = new Date(setup.lastUpdated);
        this.hardwareComponents = [...setup.hardwareComponents];
        this.images = [...setup.images];
        this.comments = [...setup.comments];
    }

    validate(setup: {
        id?: number;
        ownerId: number;
        owner: User;
        hardwareComponents: HardwareComponent[];
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
        if (!Array.isArray(setup.hardwareComponents)) {
            throw new Error('Hardware components must be an array');
        }
        if (!Array.isArray(setup.images)) {
            throw new Error('Images must be an array');
        }
        if (setup.comments && !Array.isArray(setup.comments)) {
            throw new Error('Comments must be an array');
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
    // Update getter method name
    public getHardwareComponents(): HardwareComponent[] {
        return this.hardwareComponents ? [...this.hardwareComponents] : [];
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

    public addHardwareComponent(hardwareComponent: HardwareComponent): void {
        if (this.hardwareComponents.includes(hardwareComponent)) {
            throw new Error('Hardware component already exists in the list');
        }
        this.hardwareComponents.push(hardwareComponent);
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
        owner,
        ownerId,
        hardwareComponents,
        images,
        details,
        lastUpdated,
        comments,
    }: SetupPrisma & {
        owner: UserPrisma;
        hardwareComponents: (HardwareComponentToSetupPrisma & {
            hardwareComponent: HardwareComponentPrisma;
        })[];
        images: ImagesPrisma[];
        comments: CommentPrisma[];
    }): Setup {
        return new Setup({
            id,
            ownerId,
            owner: User.from(owner),
            hardwareComponents: hardwareComponents.map((hc) =>
                HardwareComponent.from(hc.hardwareComponent)
            ),
            images: images.map(Image.from),
            details,
            lastUpdated,
            comments: comments.map(Comment.from),
        });
    }
}
