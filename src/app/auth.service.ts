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
  auth;

  get email() {
    return this.auth.currentUser && this.auth.currentUser.email;
  }

  constructor(private store: Store<{ login: LoginState }>) {
    this.auth = firebase.auth();
  }

  async login(email, password) {
    const auth = await this.auth.signInWithEmailAndPassword(email, password);
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
    const auth = await this.auth.sendSignInLinkToEmail(
      email,
      actionCodeSettings,
    );
  }

  async refresh(): Promise<string> {
    const token = await this.auth.currentUser.getIdToken();
    this.store.dispatch(
      login({
        email: this.auth.currentUser.email,
        token,
      }),
    );
    return token;
  }

  async logout() {
    this.auth.signOut();
    this.store.dispatch(logout());
  }

  async emailSignIn() {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    const auth = await this.auth.signInWithEmailLink(
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
