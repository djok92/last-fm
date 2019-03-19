import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { HomeModule } from './modules/home/home.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { LoginRegistrationModule } from './modules/login-registration/login-registration.module';
import { ArtistModule } from './modules/artist/artist.module';
import { ProfileModule } from './modules/profile/profile.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HomeModule,
    TracksModule,
    LoginRegistrationModule,
    ArtistModule,
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
