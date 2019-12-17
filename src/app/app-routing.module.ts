import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImpressumComponent} from './impressum/impressum.component';
import {DatenschutzComponent} from './datenschutz/datenschutz.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'datenschutz', component: DatenschutzComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
