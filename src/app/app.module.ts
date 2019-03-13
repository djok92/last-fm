import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { CardComponent } from './components/card/card.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { TrackComponent } from './pages/track/track.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserComponent } from './components/user/user.component';
import { LoginRegistrationComponent } from './pages/login-registration/login-registration.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HeaderLogoutComponent } from './components/header-logout/header-logout.component';
import { AddSongComponent } from './pages/add-song/add-song.component';
import { AddSongFormComponent } from './components/add-song-form/add-song-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    CardComponent,
    ArtistComponent,
    TrackComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    UserComponent,
    LoginRegistrationComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    LandingPageComponent,
    HeaderLogoutComponent,
    AddSongComponent,
    AddSongFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
