import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { API_KEY, AUTH_DOMAIN, BASE_URL } from './constants';
import { login, logout } from './store/login.actions';
import { LoginState } from './store/login.reducer';
import { first, map } from 'rxjs/operators';

declare const firebase: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authService;

  get email() {
    return this.authService.currentUser && this.authService.currentUser.email;
  }

  token() {
    return this.store
      .pipe(
        select('login'),
        map(loginState => loginState.token),
        first(),
      )
      .toPromise();
  }

  constructor(private store: Store<{ login: LoginState }>) {
    const firebaseConfig = {
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
    };
    firebase.initializeApp(firebaseConfig);
    this.authService = firebase.auth();
  }

  async login(email, password) {
    const auth = await this.authService.signInWithEmailAndPassword(
      email,
      password,
    );
    const token = await auth.user.getIdToken();
    this.store.dispatch(
      login({
        email,
        token,
      }),
    );
  }

  async link(email) {
    window.localStorage.setItem('emailForSignIn', email);
    const actionCodeSettings = {
      url: BASE_URL + '/profile',
      handleCodeInApp: true,
    };
    const auth = await this.authService.sendSignInLinkToEmail(
      email,
      actionCodeSettings,
    );
  }

  async refresh(): Promise<string> {
    const token = await this.authService.currentUser.getIdToken();
    this.store.dispatch(
      login({
        email: this.authService.currentUser.email,
        token,
      }),
    );
    return token;
  }

  async logout() {
    this.authService.signOut();
    this.store.dispatch(logout());
  }

  async emailSignIn() {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    const auth = await this.authService.signInWithEmailLink(
      email,
      window.location.href,
    );
    const token = await auth.user.getIdToken();
    this.store.dispatch(
      login({
        email,
        token,
      }),
    );
    window.localStorage.removeItem('emailForSignIn');
  }
}
