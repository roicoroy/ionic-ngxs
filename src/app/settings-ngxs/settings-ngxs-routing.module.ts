import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsNgxsPage } from './settings-ngxs.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsNgxsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsNgxsPageRoutingModule {}
