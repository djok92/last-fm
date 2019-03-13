import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-logout',
  templateUrl: './header-logout.component.html',
  styleUrls: ['./header-logout.component.scss']
})
export class HeaderLogoutComponent implements OnInit {

  @Output() emitLoginTrigger: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitRegistrationTrigger = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  private clickHandlerLogin() {
    this.emitLoginTrigger.emit();
  }

  private clickHandlerRegistration() {
    this.emitRegistrationTrigger.emit();
  }

}
