export class Images {
    private url: String; // Primary key
    private details: String;

    constructor(image: { url: String, details: String }) {
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

    // SETTERS
    setUrl(url: String): void {
        this.url = url;
    }

    setDetails(details: String): void {
        this.details = details;
    }
}