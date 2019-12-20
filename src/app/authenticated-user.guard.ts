import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { select, Store } from '@ngrx/store';
import { first, map, tap } from 'rxjs/operators';
import { LoginState } from './store/login.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedUserGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<{ login: LoginState }>,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const helper = new JwtHelperService();
    return this.store.pipe(
      select('login'),
      map(user => helper.decodeToken(user.token)),
      map(payload => payload && payload.exp > Date.now() / 1000),
      first(),
    );
  }
}
