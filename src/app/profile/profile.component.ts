import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MembersService } from '../members.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentMember;

  constructor(
    private membersService: MembersService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    console.log('Looking for:', this.authService.user.email);
    this.currentMember = this.membersService.entities$.pipe(
      map(members =>
        members.find(member => member.email.toLowerCase() === this.authService.user.email.toLowerCase()),
      ),
    );
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/']);
  }

  fetch() {
    this.authService.refresh();
  }
}
