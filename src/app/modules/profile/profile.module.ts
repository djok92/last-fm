import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserComponent } from './components/user/user.component';
import { AddTrackComponent } from './pages/add-track/add-track.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProfileComponent,
    UserComponent,
    AddTrackComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
