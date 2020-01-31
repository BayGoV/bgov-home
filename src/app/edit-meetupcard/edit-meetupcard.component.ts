import { Component, Inject, Input, OnInit } from '@angular/core';
import { MeetupService } from '../meetup.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Meetup } from '../model/meetup.model';

@Component({
  selector: 'app-edit-meetupcard',
  templateUrl: './edit-meetupcard.component.html',
  styleUrls: ['./edit-meetupcard.component.scss'],
})
export class EditMeetupcardComponent implements OnInit {
  constructor(
    private meetupService: MeetupService,
    @Inject(MAT_DIALOG_DATA) public meetup: Meetup,
    public dialogRef: MatDialogRef<EditMeetupcardComponent>,
  ) {}

  ngOnInit() {}

  change(meetup) {
    delete meetup.s;
    this.meetupService.update(meetup);
    this.dialogRef.close();
  }
}
