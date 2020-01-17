import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meetup } from '../model/meetup.model';
import { MeetupService } from '../meetup.service';

@Component({
  selector: 'app-meetupcard',
  templateUrl: './meetupcard.component.html',
  styleUrls: ['./meetupcard.component.scss'],
})
export class MeetupcardComponent implements OnInit {
  @Input() meetup$: Observable<Meetup>;
  @Input() editable = false;
  editing = false;

  constructor(private meetupService: MeetupService) {}

  ngOnInit() {}

  change(meetup) {
    delete meetup.s;
    this.meetup$ = this.meetupService.update(meetup);
  }
}
