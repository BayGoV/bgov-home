import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Meetup } from '../model/meetup.model';
import { MeetupService } from '../meetup.service';
import {MatDialog} from '@angular/material';
import {EditMeetupcardComponent} from '../edit-meetupcard/edit-meetupcard.component';

@Component({
  selector: 'app-meetupcard',
  templateUrl: './meetupcard.component.html',
  styleUrls: ['./meetupcard.component.scss'],
})
export class MeetupcardComponent implements OnInit {
  @Input() meetup$: Observable<Meetup>;
  @Input() editable = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  editMeetup(meetup) {
    this.dialog.open(EditMeetupcardComponent, { data: meetup });
  }
}
