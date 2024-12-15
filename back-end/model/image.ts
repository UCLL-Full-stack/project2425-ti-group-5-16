// Define the ImagePrisma interface
interface ImagePrisma {
    id: string;
    url: string;
    details: string;
}

export class Image {
    private id: string;
    private url: string;
    private details: string;

    constructor(image: { id: string; url: string; details: string }) {
        this.validate(image);
        this.id = image.id;
        this.url = image.url;
        this.details = image.details;
    }

    // Add getId method
    getId(): string {
        return this.id;
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

    // Other methods remain similar

    static from(prismaImage: ImagePrisma): Image {
        return new Image({
            id: prismaImage.id,
            url: prismaImage.url,
            details: prismaImage.details,
        });
    }
}
