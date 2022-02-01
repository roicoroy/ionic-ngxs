import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntryFormPageRoutingModule } from './entry-form-routing.module';

import { EntryFormPage } from './entry-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryFormPageRoutingModule
  ],
  declarations: [EntryFormPage]
})
export class EntryFormPageModule {}
