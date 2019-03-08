export class Track {

    name: string;
    listeners: number;
    artist: string;
    image: string;
    link: string;
    id: string;
    country: string;
    artistId: string;
    liked: boolean;
    canLike: boolean

    constructor(value: any = {}) {
        Object.assign(this, {
            name: value.name || null,
            listeners: value.listeners || null,
            artist: value.artist || null,
            image: value.image || null,
            link: value.link || null,
            id: value.id || null,
            country: value.country || null,
            artistId: value.artistId || null,
            liked: value.liked || null,
            canLike: true,
        })
    }
}