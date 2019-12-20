import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LoginState } from '../store/login.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedIn$ = new BehaviorSubject<boolean>(false);
  displayName$ = new BehaviorSubject<string>(null);
  login$;
  subscription = new Subscription();

  constructor(
    private store: Store<{ login: LoginState }>,
    private router: Router,
  ) {
    this.login$ = store.pipe(select('login'));
    this.subscription.add(
      this.login$
        .pipe(map((user: LoginState) => !!user.token))
        .subscribe(this.loggedIn$),
    );
    this.subscription.add(
      this.login$
        .pipe(
          map((user: LoginState) =>
            user.token ? user.email : 'Not logged in',
          ),
        )
        .subscribe(this.displayName$),
    );
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  profile() {
    if (this.loggedIn$.getValue()) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
