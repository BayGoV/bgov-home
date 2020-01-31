import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticatedUserGuard } from './authenticated-user.guard';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { MeetupComponent } from './meetup/meetup.component';
import { AuthenticationHelperGuard } from './authentication-helper.guard';
import { MembershipComponent } from './membership/membership.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'meetup',
        component: MeetupComponent,
        canActivate: [AuthenticationHelperGuard],
      },
      {
        path: 'membership',
        component: MembershipComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticatedUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
