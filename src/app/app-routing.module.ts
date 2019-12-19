import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImpressumComponent} from './impressum/impressum.component';
import {DatenschutzComponent} from './datenschutz/datenschutz.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthenticatedUserGuard} from './authenticated-user.guard';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'datenschutz', component: DatenschutzComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthenticatedUserGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
