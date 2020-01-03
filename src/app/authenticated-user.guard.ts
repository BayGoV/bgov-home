import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { select, Store } from '@ngrx/store';
import { first, map } from 'rxjs/operators';
import { LoginState } from './store/login.reducer';
import { AuthService } from './auth.service';

declare const firebase: any;

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedUserGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<{ login: LoginState }>,
    private authService: AuthService,
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    const helper = new JwtHelperService();
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      await this.authService.emailSignIn();
    }

    return this.store
      .pipe(
        select('login'),
        map(user => helper.decodeToken(user.token)),
        map(payload => !!payload && payload.exp > Date.now() / 1000),
        first(),
      )
      .toPromise();
  }
}
