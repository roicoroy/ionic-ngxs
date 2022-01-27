import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculatorNgxsPageRoutingModule } from './calculator-ngxs-routing.module';

import { CalculatorNgxsPage } from './calculator-ngxs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculatorNgxsPageRoutingModule
  ],
  declarations: [CalculatorNgxsPage]
})
export class CalculatorNgxsPageModule {}
