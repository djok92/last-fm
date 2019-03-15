export class Track {
  name: string;
  listeners: number;
  artist: string;
  image: string;
  link: string;
  duration: string;
  id: string;
  country: string;
  artistId: string;
  tags: any;
  liked: boolean;
  canLike: boolean;

  constructor(value: any = {}) {
    Object.assign(this, {
      name: value.name || null,
      listeners: value.listeners || null,
      artist: value.artist || null,
      image: value.image || null,
      link: value.link || null,
      duration: value.duration || null,
      id: value.id || null,
      country: value.country || null,
      tags: value.tags || null,
      artistId: value.artistId || null,
      liked: value.liked || null,
      canLike: true
    });
  }
}
