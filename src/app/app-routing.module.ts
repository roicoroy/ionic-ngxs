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
    path: 'settings-ngxs',
    loadChildren: () => import('./settings-ngxs/settings-ngxs.module').then(m => m.SettingsNgxsPageModule)
  },
  {
    path: 'test-array',
    loadChildren: () => import('./test-array/test-array.module').then(m => m.TestArrayPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./calculator-ngxs/result/result.module').then( m => m.ResultPageModule)
  },
  // {
  //   path: 'waiters',
  //   loadChildren: () => import('./components/waiters/waiters.module').then( m => m.WaitersPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
