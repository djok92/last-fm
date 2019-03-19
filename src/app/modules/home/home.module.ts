import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    SearchFormComponent,
    HomeComponent,
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
