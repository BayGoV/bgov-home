import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-new-meetupcard',
  templateUrl: './new-meetupcard.component.html',
  styleUrls: ['./new-meetupcard.component.scss'],
})
export class NewMeetupcardComponent implements OnInit {
  meetup$ = of({
    id: Date.now().toString(),
    name: '',
    address: { value: '', scope: 'public' },
    frequency: { value: '', scope: 'public' },
    email: { value: '', scope: 'public' },
    phone: { value: '', scope: 'public' },
    scope: 'public',
  });

  constructor() {}

  ngOnInit() {}
}
