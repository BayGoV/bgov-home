import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {login, logout} from './store/login.actions';
import {API_KEY, AUTH_DOMAIN} from './constants';

declare const firebase: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private store: Store<{ login: { username: '', token: '' } }>) {
  }

  ngOnInit(): void {
    this.googleInit();
  }

  logout() {
    this.store.dispatch(logout());
  }

  public googleInit() {
    const firebaseConfig = {
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
    };
    firebase.initializeApp(firebaseConfig);
  }


}
