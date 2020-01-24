import { Component, Inject, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Meetup } from '../model/meetup.model';

@Component({
  selector: 'app-new-meetupcard',
  templateUrl: './new-meetupcard.component.html',
  styleUrls: ['./new-meetupcard.component.scss'],
})
export class NewMeetupcardComponent implements OnInit {
  meetup$;
  newMeetup = {
    id: Date.now().toString(),
    name: '',
    address: { value: '', scope: 'public' },
    frequency: { value: '', scope: 'public' },
    email: { value: '', scope: 'public' },
    phone: { value: '', scope: 'public' },
    scope: 'private',
    s: 'New',
  };

  constructor(
    public dialogRef: MatDialogRef<NewMeetupcardComponent>,
    @Inject(MAT_DIALOG_DATA) public meetup: Meetup,
  ) {}

  ngOnInit() {
    this.meetup$ = of(!!this.meetup ? this.meetup : this.newMeetup);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
