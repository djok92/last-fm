import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TrackComponent } from './pages/track/track.component';
import { ArtistComponent } from './pages/artist/artist.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginRegistrationComponent } from './pages/login-registration/login-registration.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  { path: 'track/:id', component: TrackComponent },
  { path: 'artist/:id', component: ArtistComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginRegistrationComponent },
  { path: 'home/logout', component: LandingPageComponent },
  { path: '**', redirectTo: 'home/logout' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
