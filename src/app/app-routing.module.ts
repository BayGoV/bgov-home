import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImpressumComponent} from './impressum/impressum.component';


const routes: Routes = [{path: 'impressum', component: ImpressumComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
