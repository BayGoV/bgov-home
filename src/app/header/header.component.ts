import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  login;
  login$;
  subscription = new Subscription();


  constructor(private store: Store<{ login: { username: '', token: '' } }>) {
    this.login$ = store.pipe(
      select('login'),
      map(user => user.token ? user.username : 'Not logged in'));
    this.login$.subscribe(() => this.login = false);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
