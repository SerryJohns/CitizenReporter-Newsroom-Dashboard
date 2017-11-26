export class Story {
    id: String;
    uploaded: Boolean;
    media: String[];
    localID: String;
    summary: String;
    author: String;
    assignment: String;
    updatedAt: Date;
    cachedLocation: String;
    title: String;
    when: Date;
    createdAt: Date;
    sourceApp: String;
    who: String;
}

export class StoryMedia {
    image: String[];
    audio: String[];
    video: String[];
}
