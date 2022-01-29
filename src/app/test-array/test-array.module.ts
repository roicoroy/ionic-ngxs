import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestArrayPageRoutingModule } from './test-array-routing.module';

import { TestArrayPage } from './test-array.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestArrayPageRoutingModule,
    ReactiveFormsModule,
    IonicSelectableModule
  ],
  declarations: [TestArrayPage]
})
export class TestArrayPageModule {}
