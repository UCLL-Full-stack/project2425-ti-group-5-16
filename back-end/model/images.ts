import { Image as ImagesPrisma } from '@prisma/client';
export class Images {
    private url: string; // Primary key
    private details: string;

    constructor(image: { url: string; details: string }) {
        this.validate(image);
        this.url = image.url;
        this.details = image.details;
    }

    // GETTERS
    getUrl(): String {
        return this.url;
    }

    getDetails(): String {
        return this.details;
    }

    validate(image: { url: string; details: string }): void {
        if (!image.url || !image.details) {
            throw new Error('URL and details are required');
        }
        if (typeof image.url !== 'string' || typeof image.details !== 'string') {
            throw new Error('Invalid data type: URL and details must be strings');
        }
    }

    // SETTERS
    setUrl(url: string): void {
        this.url = url;
    }

    setDetails(details: string): void {
        this.details = details;
    }

    static from(imagesPrisma: ImagesPrisma): Images {
        return new Images({
            url: imagesPrisma.url,
            details: imagesPrisma.details,
        });
    }
}
