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
  @Input() functionArtist: any;
  @Input() functionTrack: any;
  @Input() route: string;
  @Input() liked: boolean;
  @Output() sendLikeInfoEmitter = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  sendLikeInfo() {
    this.sendLikeInfoEmitter.emit(true);
  }

}
