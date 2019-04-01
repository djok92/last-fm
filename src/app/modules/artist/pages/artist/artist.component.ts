import { Component, OnInit } from '@angular/core';
import { ArtistService } from 'src/app/services/artist.service';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/classes/artist';
import { MusicService } from 'src/app/services/music.service';
import { Track } from 'src/app/classes/track';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artistToShow: any;
  currentPage: any;
  artists: Artist[] = [];

  constructor(
    private artistService: ArtistService,
    private musicService: MusicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.showArtist();
    this.getArtists();
  }

  showArtist() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.artistService.getArtistById(id).subscribe((artist: Artist) => {
        this.artistToShow = artist;
      });
    });
  }

  // ovde radis ovde zato sto je losa praksa da se servis poziva u servisu pa da se ranuje ta funkcija u konstruktoru, pametne komponente
  // mogu da imaju malo slobode, a iz servisa se poziva samo funkcija koja setuje vrednost u BSubjektu .next(argument koji smo sredili ovde)
  getArtists() {
    this.musicService
      .getTracks()
      .pipe(
        map((tracks: Track[]) => {
          this.artists = tracks.map((track: Track) => {
            return new Artist({
              name: track.artist,
              listeners: +track.listeners,
              image: track.image,
              id: track.artistId
            });
          });
          return this.artists;
        })
      )
      .subscribe((artists: Artist[]) => {
        this.artistService.setArtists(artists);
      });
  }

  getLikeInfo($event) {
    this.artistToShow.liked = $event;
    this.artistService.setLikesArtist(this.artistToShow);
  }
}
