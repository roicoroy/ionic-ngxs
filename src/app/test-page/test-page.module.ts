import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestPagePageRoutingModule } from './test-page-routing.module';

import { TestPagePage } from './test-page.page';
import { MaterialModule } from '../material.module';
import { FormsComponent } from './forms/forms.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPagePageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    // FormsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    TestPagePage,
    // FormsComponent
  ]
})
export class TestPagePageModule {}
