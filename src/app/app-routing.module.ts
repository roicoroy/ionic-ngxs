import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'calculator-ngxs',
    loadChildren: () => import('./calculator-ngxs/calculator-ngxs.module').then(m => m.CalculatorNgxsPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./result/result.module').then(m => m.ResultPageModule)
  },
  {
    path: 'entry-form',
    loadChildren: () => import('./entry-form/entry-form.module').then(m => m.EntryFormPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings-tabs/tabs.module').then(m => m.TabsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
