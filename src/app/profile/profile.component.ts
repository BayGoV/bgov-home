import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MembersService } from '../members.service';
import { map, switchMap } from 'rxjs/operators';
import { PreferencesService } from '../preferences.service';
import { Member } from '../model/member.model';
import { MeetupService } from '../meetup.service';
import { NewMeetupcardComponent } from '../new-meetupcard/new-meetupcard.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentMember;
  currentPreference;
  meetups$;

  constructor(
    private membersService: MembersService,
    private preferenceService: PreferencesService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.currentMember = this.membersService.entities$.pipe(
      map(members =>
        members.find(
          member =>
            member.email.toLowerCase() === this.authService.email.toLowerCase(),
        ),
      ),
    );
    this.currentPreference = this.currentMember.pipe(
      switchMap((member: Member) =>
        this.preferenceService.entities$.pipe(
          map(preferences => preferences.find(p => p.id === member.id)),
        ),
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
