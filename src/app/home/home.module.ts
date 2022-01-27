import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { WaiterFormComponent } from '../components/waiter-form/waiter-form.component';
import { WaitersListComponent } from '../components/waiters-list/waiters-list.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomePage,

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HomePageModule { }
