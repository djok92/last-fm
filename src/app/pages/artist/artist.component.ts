import { Component, OnInit } from '@angular/core';
import { ArtistService } from 'src/app/services/artist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artistToShow: any;
  currentPage: any;

  constructor(
    private artistService: ArtistService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.showArtist();
    this.getRoute();
  }

  showArtist() {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.artistService.getArtistById(id).subscribe((artist: any) => {
        this.artistToShow = artist;
      });
    });
  }

  getRoute() {
    this.route.url.subscribe(res => {
      this.currentPage = res[0].path;
    });
  }
}
