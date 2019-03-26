import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.scss']
})
export class LoginRegistrationComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject(1);

  paramSubscription: Subscription;

  user: any = {};
  users: User[] = [];
  userImage: string = null;
  login = true;
  loginError = false;
  registrationError = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
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
    this.getUsers();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  // get current value of users from service
  getUsers() {
    this.userService.getUsers().subscribe((res: User[]) => {
      this.users = res;
    });
  }

  getRegistrationValues(event) {
    // get input values from form
    this.user = event;
    if (this.authService.checkUserRegistration(this.user, this.users)) {
      this.registrationError = false;
      this.userService.storeUser(this.user);
    } else {
      this.registrationError = true;
    }
  }

  getLoginValues(event) {
    // get input values from form
    this.user = event;
    if (this.authService.checkUserLogin(this.user, this.users)) {
      const loggedUser = this.users.find((user: User) => user.email === this.user.email);
      this.userService.setUser(loggedUser);
      this.loginError = false;
      this.router.navigate(['/profile']);
    } else {
      this.loginError = true;
    }
  }
}
