import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artist } from '../classes/artist';
import { HttpClient } from '@angular/common/http';

const ENTITY_KEY = 'ARTISTS';

const API_KEY = '7aca6ef86ceb095034f88fa36aa6e3f9';
const ENDPOINT_URL = 'http://ws.audioscrobbler.com/2.0/';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  constructor(private http: HttpClient) {
  }

  private _artists$: BehaviorSubject<Artist[]> = new BehaviorSubject<Artist[]>([]);

  setArtists(artists: Artist[]) {
    this._artists$.next(artists);
  }

  getArtistById(id: string) {
    const artist$: ReplaySubject<Artist> = new ReplaySubject();
    const url = `${ENDPOINT_URL}?method=artist.getinfo&mbid=${id}&api_key=${API_KEY}&format=json`;
    this.http
      .get(url)
      .pipe(
        map((res: any) => {
          const artist = this.mapArtist(res.artist);
          return artist;
        })
      )
      .subscribe((artist: Artist) => {
        artist$.next(artist);
      });
    return artist$.asObservable();
  }

  setLikesArtist(artist: Artist) {
    const artists = this._artists$.value;
    const likedArtist = artists.find((a: Artist) => a.id === artist.id);
    likedArtist.liked = !likedArtist.liked;
    this.pushNextState(artists);
    console.log(this._artists$);
  }

  getLikesArtist(): Observable<Artist[]> {
    console.log(this._artists$.value);
    return this._artists$
      .asObservable()
      .pipe(
        map((artists: Artist[]) => artists.filter(artist => artist.liked))
      );
  }

  private mapArtist(item: any) {
    return new Artist({
      name: item.name,
      listeners: +item.stats.listeners,
      image: item.image[2]['#text'],
      link: item.url,
      id: item.mbid
    });
  }

  private pushNextState(artists: Artist[]) {
    this._artists$.next(artists);
    localStorage.setItem(ENTITY_KEY, JSON.stringify(artists));
  }
}


