import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { snackbar } from '../store/snackbar.actions';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  subject;
  message;

  constructor(private store: Store<any>, private http: HttpClient) {}

  ngOnInit() {}

  reset() {
    this.subject = '';
    this.message = '';
  }

  snack() {
    if (!this.subject && !this.message) {
      this.store.dispatch(
        snackbar({
          active: true,
          message: 'Das Formular ist leer.',
          progress: false,
        }),
      );
    } else {
      this.store.dispatch(
        snackbar({
          active: true,
          message: 'Nachricht wird übertragen',
          progress: true,
        }),
      );
      this.http
        .post(API_URL + '/contact/anon', {
          subject: this.subject,
          message: this.message,
        })
        .subscribe(
          () => {
            this.reset();
            this.store.dispatch(
              snackbar({
                active: true,
                message: 'Nachricht erfolgreich übertragen. Danke.',
              }),
            );
          },
          () =>
            this.store.dispatch(
              snackbar({
                active: true,
                message: 'Fehler. Bitte später versuchen.',
              }),
            ),
        );
    }
  }
}
