import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/modules/home/pages/home/home.component';
import { ProfileComponent } from '../app/modules/profile/pages/profile/profile.component';
import { LoginRegistrationComponent } from '../app/modules/login-registration/pages/login-registration/login-registration.component';
import { AddTrackComponent } from '../app/modules/profile/pages/add-track/add-track.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tracks', loadChildren: './modules/tracks/tracks.module#TracksModule' },
  { path: 'artists', loadChildren: './modules/artist/artist.module#ArtistModule' },
  { path: 'home', loadChildren: './modules/home/home.module#HomeModule' },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginRegistrationComponent },
  { path: 'add', component: AddTrackComponent },
  { path: '**', redirectTo: 'home/logout' }


  /**
   *  {
   * path: 'tracks',
   * loadChildren: './modules/tracks/tracks.module#TracksModule'
   * }
   */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
