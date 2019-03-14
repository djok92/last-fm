export class Artist {
  name: string;
  listeners: number;
  image: string;
  link: string;
  id: string;

  constructor(value: any = {}) {
    Object.assign(this, {
      name: value.name || null,
      listeners: value.listeners || null,
      image: value.image || null,
      link: value.link || null,
      id: value.id || null
    });
  }
}
