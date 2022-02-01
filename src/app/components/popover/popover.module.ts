
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PopoverRoutingModule } from './popover-routing.module';
import { PopoverComponent } from './popover.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverRoutingModule
  ],
  declarations: [
    PopoverComponent
  ],
  entryComponents:[

  ]
})
export class PopoverModule {}
