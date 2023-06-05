class MissingSemzoomContent {
    constructor() {
        this.id = -1;
        this.parentid = -1;
        this.contentid = 'nocontentid';
        this.version = 1;
        this.metadata = {};
        this.content = `<em class="error">Failed to retrieve content with id ${this.id}</em>`;
        this.children = [];
    }
}
export const missingSemzoomContent = new MissingSemzoomContent();
