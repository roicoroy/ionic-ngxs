import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestArrayPage } from './test-array.page';

const routes: Routes = [
  {
    path: '',
    component: TestArrayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestArrayPageRoutingModule {}
