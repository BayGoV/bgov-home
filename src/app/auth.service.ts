import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BASE_URL } from './constants';
import { login, logout } from './store/login.actions';
import { LoginState } from './store/login.reducer';

declare const firebase: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user;

  constructor(private store: Store<{ login: LoginState }>) {}

  async login(email, password) {
    const auth = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    this.user = auth.user;
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
    const auth = await firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings);
  }

  async refresh(): Promise<string> {
    const token = await this.user.getIdToken();
    this.store.dispatch(
      login({
        email: this.user.email,
        token,
      }),
    );
    return token;
  }

  async logout() {
    firebase.auth().signOut();
    this.store.dispatch(logout());
  }

  async emailSignIn() {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    const auth = await firebase.auth().signInWithEmailLink(email, window.location.href);
    this.user = auth.user;
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
