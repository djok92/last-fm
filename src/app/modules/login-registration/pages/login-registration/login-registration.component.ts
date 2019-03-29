import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/classes/user';
import { TranslateService } from '@ngx-translate/core';

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

  languages: string[] = [];
  currentLang = 'rs';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {}

  languageSelectionChange(language: any) {
    this.translate.use(language.target.value);
  }

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
    this.languages = this.translate.langs;
    this.currentLang = this.translate.getDefaultLang();
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
    this.registrationError = !this.authService.checkUserRegistration(
      this.user,
      this.users
    );
    if (!this.registrationError) {
      this.userService.storeUser(this.user);
    }
  }

  getLoginValues(event) {
    // get input values from form
    this.user = event;
    this.loginError = !this.authService.checkUserLogin(this.user, this.users);
    if (!this.loginError) {
      const loggedUser = this.users.find(
        (user: User) => user.email === this.user.email
      );
      this.userService.setUser(loggedUser);
      this.loginError = false;
      this.router.navigate(['/profile']);
    }
  }
}
