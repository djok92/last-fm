import { Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/services/music.service';
import { ArtistService } from 'src/app/services/artist.service';
import { zip } from 'rxjs';
import { Artist } from 'src/app/classes/artist';
import { Track } from 'src/app/classes/track';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  likedTracks: any[] = [];
  likedArtists: any[] = [];
  user: any = {};

  constructor(private musicService: MusicService, private artistService: ArtistService, private userService: UserService) {}

  ngOnInit() {
    // ne moras da pravis funkcije da dohvate rezultate, nego se odmah subscribe na rezultat
    zip(
      this.musicService.getLikesTrack(),
      this.artistService.getLikesArtist(),
      this.userService.getUser()
    ).subscribe((data: [Track[], Artist[], any]) => {
      this.likedTracks = data[0];
      this.likedArtists = data[1];
      this.user = data[2];
    });
  }
}
