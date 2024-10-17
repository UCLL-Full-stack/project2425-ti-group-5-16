export class images {
    readonly url: String;

    constructor(image: { url: String }) {
        this.url = image.url;
    }

    getUrl(): String {
        return this.url;
    }
}