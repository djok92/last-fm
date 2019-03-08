import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  // @Input() functionArtist: any;
  // @Input() functionTrack: any;

  constructor() { }

  ngOnInit() {
    // this.functionArtist();
    // this.functionTrack();
  }

}
