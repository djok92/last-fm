import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Track } from '../classes/track';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';

const API_KEY = '7aca6ef86ceb095034f88fa36aa6e3f9';
const ENDPOINT_URL = 'http://ws.audioscrobbler.com/2.0/' 

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private _tracks$: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>([]);
  constructor(private http: HttpClient) { }

  searchByCountry(country: string) {
    const url = `${ENDPOINT_URL}?method=geo.gettoptracks&country=${country}&api_key=${API_KEY}&format=json`;
    if (!this._tracks$.value.find((track: Track) => track.country === country)) {
      this.http.get(url)
      .pipe(
        map((res: any) => {
          let tracks: any[] = res.tracks.track;
          tracks = tracks.map(this.mapTrack)
            .filter(item => item.id !== null)
            .map(item => {
              item.country = country;
              return item;
            });
          //ovde setujes da ti je current value onoga na sta ti se subskrajbuju komponente (_tracks$) bude sredjena verzija podataka koje si dobio od apija(let tracks)
          return tracks;
        })
      ).subscribe((tracks: Track[]) => {
        this.pushNextState([...this._tracks$.value, ...tracks]);
      });
    }

    return this._tracks$.asObservable()
      .pipe(
        map((tracks: Track[]) => tracks.filter(track => track.country === country))
      );
  }
  
  /**
   * Funkcija koja trazi pesmu po ID. 
   * @param id koji je tipa string. Svaka pesma ima jedinstven id.
   * @returns Observable koji je tipa Track.
   */
  getTrackById(id: string): Observable<Track> {

    // Ovo je subjekat koji cuva vrednost trake sa konkretnim ID.
    // Ovaj subjekat vracamo kao Observable.
    let track$: ReplaySubject<Track> = new ReplaySubject();

    // ovde proveravamo da li pesma postoji u servisu, tacnije u _tracks$.
    // Ako postoji, track$ subjekat dobija novu vrednost preko operatora next.
    // Ako ne postoji, uradi poziv ka serveru kako bi dobio informacije o datoj pesmi.
    // ovo radimo zato sto je inicijalna vrednost BhSbj = [], tako smo je setovali
    // da ne bi bacalo error prvi put, ovo je metoda za kesiranje
    const track = this._tracks$.value.find(track => track.id === id) || null; //ovde proveravas u current verziji podataka(+tracks$.value) da li postoji pesma sa id-jem koji ces proslediti kao parametar
    if (track !== null) {
      // .next postavlja novu vrednost na subjekat. (1. slucaj)
      // ukoliko postoji, trenutna vrednost ce biti ta pesma
      track$.next(track);
    } else {
      // HTTP poziv, mapiranje... artist.getInfo
      const url = `${ENDPOINT_URL}?method=track.getInfo&mbid=${id}&api_key=${API_KEY}&format=json`; //ukoliko ne postoji ide opet zahtev da se pronadje na serveru
      this.http.get(url)
        .pipe(
          map((res: any) => {
            const track = res.track;
            return new Track({
              country: 'Serbia',
              name: track.name,
              listeners: +track.listeners,
              artist: track.artist.name,
              image: track.album.image[3]['#text'],
              tags: track.toptags.tag.map(item => item.name),
              link: track.url,
              id: track.mbid,
              liked: false
            });
          })
        )
        // Subscribe vraca track koji je tipa Track jer smo ga mapirali u pipe-u.
        // vracenu vrednost iz subscribe-a, hendlujes u funkciji => { ... }
        .subscribe((track: Track) => {
          // .next postavlja novu vrednost na subjekat. (2. slucaj);
          track$.next(track);
          this.pushNextState([...this._tracks$.value, track]);
        });
    }
    
    // Vrati track$ subjekat kao observable kako bi mogao da se pretplatis (subscribe) na njega u pametnoj komponenti (moze i servis...)
    return track$.asObservable();
  }

  setLikesTrack(track: Track) {
    const tracks = this._tracks$.value;
    const likedTrack = tracks.find((t: Track) => t.id === track.id);
    likedTrack.canLike = !likedTrack.canLike;
    likedTrack.liked = !likedTrack.canLike;
    this.pushNextState(tracks);
  }

  getLikesTrack() {
    return this._tracks$.asObservable()
    .pipe(
      map((tracks: Track[]) => tracks.filter(track => track.liked))
    );
  }

  private pushNextState(tracks: Track[]) {
    this._tracks$.next(tracks);
    localStorage.setItem('TRACKS', JSON.stringify(tracks));
  }

  private mapTrack(item: any) {
    return new Track({
      country: item.country,
      name: item.name,
      listeners: +item.listeners,
      artist: item.artist.name,
      artistId: item.artist.mbid,
      image: item.image[3]['#text'],
      link: item.url,
      id: item.mbid || null,
      liked: false,
    });
  }
}

