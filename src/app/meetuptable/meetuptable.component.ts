import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { map, switchMap } from 'rxjs/operators';
import { Member } from '../model/member.model';
import { MeetupService } from '../meetup.service';
import {EditMeetupcardComponent} from '../edit-meetupcard/edit-meetupcard.component';
import {Meetup} from '../model/meetup.model';

@Component({
  selector: 'app-meetuptable',
  templateUrl: './meetuptable.component.html',
  styleUrls: ['./meetuptable.component.scss'],
})
export class MeetuptableComponent implements OnInit {
  @Input() member: Member;
  meetups$;

  constructor(public dialog: MatDialog, private meetupService: MeetupService) {}

  ngOnInit() {
    this.meetups$ = this.meetupService.entities$.pipe(
      map(meetups =>
        meetups.filter(meetup => meetup.memberId === this.member.id),
      ),
    );
    this.meetupService.getAll();
  }

  editMeetup(meetup) {
    this.dialog.open(EditMeetupcardComponent, { data: meetup });
  }

  addOne() {
    this.dialog.open(EditMeetupcardComponent, { data: new Meetup() });
  }

  change(meetup) {
    delete meetup.s;
    this.meetupService.update(meetup);
  }
}
