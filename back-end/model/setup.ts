import { User } from './user';
import { Image } from './image';
import { Comment } from './comment';
import { HardwareComponentToSetup } from './HardwareComponentToSetup';

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
    private hardware_components: HardwareComponentToSetup[];
    private images: Image[];
    private details: string;
    private lastUpdated: Date;
    private comments: Comment[];

    constructor(setup: {
        id?: number;
        ownerId: number;
        owner: User;
        hardware_components: HardwareComponentToSetup[];
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
        owner: User;
        hardware_components: HardwareComponentToSetup[];
        images: Image[];
        details: String;
        lastUpdated: Date;
        comments?: Comment[];
    }) {
        if (setup.id !== undefined && setup.id < 0) {
            throw new Error('Setup ID must be a non-negative number');
        }
        if (setup.owner.getRole() !== setup.owner.getRole()) {
            throw new Error('Setup owner must be a user');
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
    public getHardwareComponents(): HardwareComponentToSetup[] {
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

    public addHardwareComponent(hardware_component: HardwareComponentToSetup): void {
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
    } /*
    static from(
            setupPrisma: SetupPrisma & {
            owner: UserPrisma;
            hardwareComponents: HardwareComponentToSetup[];
            images: ImagesPrisma[];
            comments: CommentPrisma[];
        }
    ): Setup {
        return new Setup({
            id: setupPrisma.id,
            ownerId: setupPrisma.ownerId,
            owner: User.from(setupPrisma.owner),
            hardware_components: setupPrisma.hardwareComponents.map((hc) =>
                HardwareComponentToSetup.from(hc)
            ),
            images: setupPrisma.images.map((img) => Image.from({ id: img.id, url: img.url, details: img.details })),
            details: setupPrisma.details,
            lastUpdated: setupPrisma.lastUpdated,
            comments: setupPrisma.comments.map((comment) => Comment.from({
                id: comment.comment_id,
                userId: comment.user_id,
                setupId: comment.setup_id,
                content: comment.content,
                createdAt: new Date() // Assuming createdAt is the current date for this example
            })),
        });
    }*/
}
