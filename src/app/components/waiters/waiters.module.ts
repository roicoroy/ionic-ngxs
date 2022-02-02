import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WaitersPage } from './waiters.page';
import { WaiterModalComponent } from './waiters/waiter-modal/waiter-modal.component';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicSelectableModule,
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
