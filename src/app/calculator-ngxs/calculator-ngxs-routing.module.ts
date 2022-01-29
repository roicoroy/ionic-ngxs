import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatorNgxsPage } from './calculator-ngxs.page';

const routes: Routes = [
  {
    path: '',
    component: CalculatorNgxsPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculatorNgxsPageRoutingModule {}
