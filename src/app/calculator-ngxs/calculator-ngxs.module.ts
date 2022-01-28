import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculatorNgxsPageRoutingModule } from './calculator-ngxs-routing.module';

import { CalculatorNgxsPage } from './calculator-ngxs.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculatorNgxsPageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    IonicSelectableModule,
  ],
  declarations: [CalculatorNgxsPage]
})
export class CalculatorNgxsPageModule {}
