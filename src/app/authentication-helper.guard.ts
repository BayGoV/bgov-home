import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, filter, first, map, timeout } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { EMPTY, interval } from 'rxjs';

declare const firebase: any;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationHelperGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async waitForUser(auth) {
    return interval(100)
      .pipe(
        map(() => auth.currentUser),
        filter(currentUser => !!currentUser),
        first(),
        timeout(1000),
        catchError(e => EMPTY),
      )
      .toPromise();
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    const helper = new JwtHelperService();
    const auth = firebase.auth();
    const currentUser = await this.waitForUser(auth);
    if (!!currentUser) {
      await this.authService.refresh();
    } else {
      if (auth.isSignInWithEmailLink(window.location.href)) {
        await this.authService.emailSignIn();
      }
    }
    return true;
  }
}
