import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() userLikedTracks: any;
  @Input() userLikedArtists: any;
  @Input() image: string;
  @Input() name: string;
  @Input() lastName: string;
  @Input() userName: string;

  constructor() {}

  ngOnInit() {
  }
}
