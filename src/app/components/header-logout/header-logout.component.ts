import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-logout',
  templateUrl: './header-logout.component.html',
  styleUrls: ['./header-logout.component.scss']
})
export class HeaderLogoutComponent implements OnInit {

  registration: boolean = false;
  login: boolean = false;
  @Output() emitLoginTrigger = new EventEmitter();
  @Output() emitRegistrationTrigger = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  private clickHandlerLogin() {
    this.login = true;
    this.emitLoginTrigger.emit(this.login);
  }

  private clickHandlerRegistration() {
    this.registration = true;
    this.emitRegistrationTrigger.emit(this.registration);
  }


}
