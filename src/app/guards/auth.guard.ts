import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {}
  isLogged = false;
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.getLoginStatus().subscribe((res: boolean) => {
      this.isLogged = res;
    });
    if (this.isLogged) {
      return true;
    } else {
      this.router.navigate(['/404']);
      return false;
    }
  }
}
