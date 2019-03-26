import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/modules/home/pages/home/home.component';
import { LoginRegistrationComponent } from '../app/modules/login-registration/pages/login-registration/login-registration.component';
import { AddTrackComponent } from '../app/modules/profile/pages/add-track/add-track.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tracks', loadChildren: './modules/tracks/tracks.module#TracksModule' },
  { path: 'artists', loadChildren: './modules/artist/artist.module#ArtistModule' },
  { path: 'home', loadChildren: './modules/home/home.module#HomeModule' },
  { path: 'profile', loadChildren: './modules/profile/profile.module#ProfileModule', canLoad: [AuthGuard] },
  { path: 'login', component: LoginRegistrationComponent },
  { path: 'add', component: AddTrackComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
