import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.scss']
})
export class LoginRegistrationComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(1);

  paramSubscription: Subscription;

  user: any = {};
  userImage: string = null;
  login = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramSubscription = this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe(params => {
        if (params.register) {
          this.login = false;
        } else {
          this.login = true;
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getRegistrationValues(event) {
    this.user = event;
    this.userService.storeUser(this.user);
  }

  getLoginValues(event) {
    this.user = event;
    this.userService.checkUserLogin(this.user);
  }
}
