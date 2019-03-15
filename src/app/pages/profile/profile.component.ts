import { Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/services/music.service';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  likedTracks: any[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    this.getLikedTracks();
  }

  getLikedTracks() {
    this.musicService.getLikesTrack().subscribe((res: any) => {
      this.likedTracks = res;
    });
  }
}
