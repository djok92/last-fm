import { Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/services/music.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  constructor(private musicService: MusicService, private route: ActivatedRoute) { }
  tracks: any[] = [];
  trackToShow: any;
  currentPage: any;

  ngOnInit() {
    this.showTrack();
    this.getRoute();
  }

  showTrack() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.musicService
        .getTrackById(id)
        .subscribe((track) => {
          this.trackToShow = track;
        });
    })
  }

   getRoute() {
    this.route.url.subscribe(res => {
      this.currentPage = res[0].path;
    })
  }

  getLikeInfo($event) { //ovde si stao, setujes track to be liked preko emitera na true, vidi posle sta treba za likedSong
    this.trackToShow.liked = $event;
    this.musicService.setLikesTrack(this.trackToShow);
  }

}
