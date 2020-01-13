import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { aotLoginReducer } from './store/login.reducer';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ApiInterceptor } from './http-interceptors/api-interceptor';
import { ProfileComponent } from './profile/profile.component';
import { LoginEffects } from './store/login.effects';
import { MembersService } from './members.service';
import { PreferencesService } from './preferences.service';
import { API_URL } from './constants';
import { MembercardComponent } from './membercard/membercard.component';
import { PreferencecardComponent } from './preferencecard/preferencecard.component';
import { MemberEffects } from './store/member.effects';
import { MenuComponent } from './menu/menu.component';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: API_URL,
  timeout: 3000, // request timeout
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ImpressumComponent,
    DatenschutzComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    MembercardComponent,
    PreferencecardComponent,
    MenuComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    StoreModule.forRoot({ login: aotLoginReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([LoginEffects, MemberEffects]),
    EntityDataModule.forRoot(entityConfig),
    MatCardModule,
    MatCheckboxModule,
  ],
  providers: [
    MembersService,
    PreferencesService,
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
