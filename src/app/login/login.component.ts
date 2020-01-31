import { Component, HostListener } from '@angular/core';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { API_URL } from '../constants';
import { snackbar } from '../store/snackbar.actions';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email;
  password;

  @HostListener('keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private store: Store<{}>,
  ) {
  }

  async login() {
    await this.authService.login(this.email, this.password);
    this.router.navigate(['/profile']);
  }

  async link() {
    try {
      await this.http
        .post(API_URL + '/api/member/canSignIn', {
          email: this.email,
        })
        .toPromise();
      await this.authService.link(this.email);
      this.store.dispatch(
        snackbar({
          active: true,
          message: 'Email gesendet. Bitte auch SPAM/AV checken.',
        }),
      );
    } catch (e) {
      const message =
        e.status === 404
          ? 'Email nicht gefunden.'
          : 'Unbekannter Fehler. Bitte melden.';
      this.store.dispatch(snackbar({ active: true, message }));
    }
  }
}
