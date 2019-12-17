import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {login} from '../store/login.actions';
import {select, Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {BASE_URL} from '../constants';

declare const firebase: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email$;
  email;
  password;
  subscription = new Subscription();

  @HostListener('keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  constructor(private store: Store<{ login: { username: '', token: '' } }>) {
    this.email$ = store.pipe(
      select('login'),
      map(user => user.username));
    this.subscription.add(this.email$.subscribe(email => {
      this.email = email;
    }));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.login();
  }

  login() {
    const actionCodeSettings = {
      url: BASE_URL,
      handleCodeInApp: true,
    };
    firebase
      .auth()
      // .sendSignInLinkToEmail(email, actionCodeSettings)
      .signInWithEmailAndPassword(this.email, this.password)
      .then((f) => {
        f.user.getIdToken().then((idToken) => {
            this.store.dispatch(
              login({
                username: this.email,
                token: idToken,
              }),
            );
          }
        )
        ;
      })
      .catch(error => {
        // Some error occurred, you can inspect the code: error.code
        console.error(error);
      });
  }
}
