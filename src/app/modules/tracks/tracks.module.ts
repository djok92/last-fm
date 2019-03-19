import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TracksRoutingModule } from './tracks-routing.module';
import { TrackComponent } from './pages/track/track.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TrackComponent,
  ],
  imports: [
    CommonModule,
    TracksRoutingModule,
    SharedModule
  ],
  exports: [
    TracksRoutingModule
  ]
})
export class TracksModule { }
