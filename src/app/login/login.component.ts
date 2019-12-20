import { Component, HostListener } from '@angular/core';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    await this.authService.login(this.email, this.password);
    this.router.navigate(['/profile']);
  }
}
