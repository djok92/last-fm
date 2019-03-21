import { Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/services/music.service';
import { ArtistService } from 'src/app/services/artist.service';
import { zip } from 'rxjs';
import { Artist } from 'src/app/classes/artist';
import { Track } from 'src/app/classes/track';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  likedTracks: any[] = [];
  likedArtists: any[] = [];

  constructor(private musicService: MusicService, private artistService: ArtistService) {}

  ngOnInit() {
    zip(
      this.musicService.getLikesTrack(),
      this.artistService.getLikesArtist()
    ).subscribe((data: [Track[], Artist[]]) => {
      this.likedTracks = data[0];
      this.likedArtists = data[1];
      console.log(this.likedArtists);
    });
  }
}
