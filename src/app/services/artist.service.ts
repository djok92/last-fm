import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artist } from '../classes/artist';
import { HttpClient } from '@angular/common/http';


const API_KEY = '7aca6ef86ceb095034f88fa36aa6e3f9';
const ENDPOINT_URL = 'http://ws.audioscrobbler.com/2.0/' 

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  

  constructor(private http: HttpClient, private artistService: ArtistService) { }

  getArtistById(id: string) {
    let artist$: ReplaySubject<Artist> = new ReplaySubject();
    const url = `${ENDPOINT_URL}?method=artist.getinfo&mbid=${id}&api_key=${API_KEY}&format=json`;
    this.http.get(url)
      .pipe(
        map((res: any) => {
          let artist = this.mapArtist(res.artist);
          return artist
        })
      ).subscribe((artist: any) => {
        artist$.next(artist)
      })
      return artist$.asObservable();
  }

  setLikesArtist() {
    console.log("hello set artist")
  }

  getLikesArtist() {
    console.log("hello get likes artist")
  }

  private mapArtist(item: any) {
    return new Artist({
      name: item.name,
      listeners: +item.stats.listeners,
      image: item.image[2]['#text'],
      link: item.url,
      id: item.mbid
    })
  }
}
