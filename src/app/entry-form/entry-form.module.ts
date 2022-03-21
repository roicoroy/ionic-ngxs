import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryFormPageRoutingModule } from './entry-form-routing.module';
import { EntryFormPage } from './entry-form.page';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryFormPageRoutingModule,
    // MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EntryFormPage,
  ],
  entryComponents: [

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class EntryFormPageModule { }
