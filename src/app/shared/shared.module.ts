import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../components/card/card.component';
import { HeaderComponent } from '../components/header/header.component';
import { HeaderLogoutComponent } from '../components/header-logout/header-logout.component';

@NgModule({
  declarations: [
    CardComponent,
    HeaderComponent,
    HeaderLogoutComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CardComponent,
    HeaderComponent,
    HeaderLogoutComponent
  ]
})
export class SharedModule { }
