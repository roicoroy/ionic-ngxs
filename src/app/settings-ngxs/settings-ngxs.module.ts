import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsNgxsPageRoutingModule } from './settings-ngxs-routing.module';

import { SettingsNgxsPage } from './settings-ngxs.page';
import { WaiterFormComponent } from '../components/waiter-form/waiter-form.component';
import { WaitersListComponent } from '../components/waiters-list/waiters-list.component';
import { PointsModule } from '../components/points/points.module';
import { WaitersPageModule } from '../components/waiters/waiters.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsNgxsPageRoutingModule,
    ReactiveFormsModule,
    PointsModule,
    WaitersPageModule
  ],
  declarations: [
    SettingsNgxsPage,
    WaiterFormComponent,
    WaitersListComponent,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SettingsNgxsPageModule { }
