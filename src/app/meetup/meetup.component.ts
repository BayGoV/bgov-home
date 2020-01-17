import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewMeetupcardComponent} from '../new-meetupcard/new-meetupcard.component';
import {MeetupService} from '../meetup.service';
import {LoginState} from '../store/login.reducer';
import {select, Store} from '@ngrx/store';
import {map, tap} from 'rxjs/operators';
import {MembersService} from '../members.service';

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',
  styleUrls: ['./meetup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetupComponent implements OnInit {
  meetups$;
  login$;

  constructor(
    public dialog: MatDialog,
    private meetupService: MeetupService,
    private memberService: MembersService,
    private store: Store<{ login: LoginState }>,
  ) {
  }

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

  editable(meetup) {
    return this.memberService.getSelf().pipe(
      tap(m => console.log(m)),
      map(member => !!member && meetup.memberId === member.id),
    );
  }
}
