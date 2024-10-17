export class image_url {
    readonly url: String;

    constructor(image: { url: String }) {
        this.url = image.url;
    }
}