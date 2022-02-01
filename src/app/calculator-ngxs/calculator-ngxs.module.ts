import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculatorNgxsPageRoutingModule } from './calculator-ngxs-routing.module';

import { CalculatorNgxsPage } from './calculator-ngxs.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { MaterialModule } from '../material.module';
import { TooltipsModule } from '../components/ionic4-tooltips/src/tooltips.module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculatorNgxsPageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    TooltipsModule,
    DirectivesModule
  ],
  declarations: [CalculatorNgxsPage]
})
export class CalculatorNgxsPageModule {}
