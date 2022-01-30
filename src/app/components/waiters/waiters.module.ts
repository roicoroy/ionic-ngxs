import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WaitersPage } from './waiters.page';
import { WaiterModalComponent } from './waiters/waiter-modal/waiter-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    WaitersPage,
    WaiterModalComponent
  ],
  exports: [
    WaitersPage,
    WaiterModalComponent
  ]
})
export class WaitersPageModule { }
