import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewMeetupcardComponent } from '../new-meetupcard/new-meetupcard.component';
import { MeetupService } from '../meetup.service';
import { LoginState } from '../store/login.reducer';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',
  styleUrls: ['./meetup.component.scss'],
})
export class MeetupComponent implements OnInit {
  meetups$;
  login$;

  constructor(
    public dialog: MatDialog,
    private meetupService: MeetupService,
    private store: Store<{ login: LoginState }>,
  ) {}

  ngOnInit() {
    this.meetupService.getAll();
    this.meetups$ = this.meetupService.entities$;
    this.login$ = this.store.pipe(
      select('login'),
      map(login => !!login.token),
    );
  }

  addOne() {
    this.dialog.open(NewMeetupcardComponent);
  }

  meetup$(meetup) {
    return this.meetupService.entities$.pipe(
      map(meetups => meetups.find(m => m.id === meetup.id)),
    );
  }
}
