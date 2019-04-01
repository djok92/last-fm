import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() img: string;
  @Input() name: string;
  @Input() listeners: number;
  @Input() artist: string;
  @Input() link: string;
  @Input() route: string;
  @Input() liked: boolean;
  @Output() sendLikeInfoTrackEmitter = new EventEmitter();
  @Output() sendLikeInfoArtistEmitter = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  sendLikeInfoTrack() {
    this.sendLikeInfoTrackEmitter.emit(true);
  }

  sendLikeInfoArtist() {
    this.sendLikeInfoArtistEmitter.emit(true);
  }
}
