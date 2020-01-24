import { Component, Input, OnInit } from '@angular/core';
import { NewMeetupcardComponent } from '../new-meetupcard/new-meetupcard.component';
import { MatDialog } from '@angular/material';
import { map, switchMap } from 'rxjs/operators';
import { Member } from '../model/member.model';
import { MeetupService } from '../meetup.service';

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
    this.dialog.open(NewMeetupcardComponent, { data: meetup });
  }

  addOne() {
    this.dialog.open(NewMeetupcardComponent);
  }

  change(meetup) {
    this.meetupService.update(meetup);
  }
}
