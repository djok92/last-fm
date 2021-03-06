import { Component, OnInit } from '@angular/core';
import { MusicService } from 'src/app/services/music.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formValues: any;
  tracks: any[] = [];
  artists: any[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit() {}

  getFormValues($event) {
    this.formValues = $event;
    this.musicService
      .searchByCountry(this.formValues.country)
      .subscribe(tracks => {
        this.tracks = tracks;
      });
  }
}
