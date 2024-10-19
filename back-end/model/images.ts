export class Images {
    private url: String; // Primary key

    constructor(image: { url: String }) {
        this.url = image.url;
    }

    // GETTERS
    getUrl(): String {
        return this.url;
    }

    // SETTERS
    setUrl(url: String): void {
        this.url = url;
    }
}