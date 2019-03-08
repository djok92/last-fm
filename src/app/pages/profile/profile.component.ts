import { Component, OnInit } from '@angular/core';
// import { ProfileService } from 'src/app/services/profile.service';
import { MusicService } from 'src/app/services/music.service';
import { ArtistService } from 'src/app/services/artist.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})



export class ProfileComponent implements OnInit {

  likedTracks: any[] = [];

  constructor(private musicService: MusicService, private artistService: ArtistService) { }

  ngOnInit() {
    this.getTracks();
  }

  getTracks() {
    this.musicService.getLikesTrack()
      .subscribe((res: any) => {
        console.log(res);
      })
  }

}
