import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackComponent } from './pages/track/track.component';

const routes: Routes = [
  { path: ':id', component: TrackComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TracksRoutingModule {
}
