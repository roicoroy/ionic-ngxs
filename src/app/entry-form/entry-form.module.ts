import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryFormPageRoutingModule } from './entry-form-routing.module';

import { EntryFormPage } from './entry-form.page';
// import { FormPage } from './form/form.page';
// import { FormPageModule } from './form/form.module';
import { MaterialModule } from '../material.module';
import { FormsComponent } from '../test-page/forms/forms.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryFormPageRoutingModule,
    // FormPageModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EntryFormPage,
    // FormPage
    FormsComponent
  ],
  entryComponents: [
    // FormPage
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class EntryFormPageModule { }
