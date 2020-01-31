import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants';

@Component({
  selector: 'app-mailing-lists',
  templateUrl: './mailing-lists.component.html',
  styleUrls: ['./mailing-lists.component.scss'],
})
export class MailingListsComponent implements OnInit {
  mailinglist$;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.mailinglist$ = this.http.get(API_URL + '/api/member/mailinglists');
  }
}
