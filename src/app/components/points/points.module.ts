import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PointsModalComponent } from './points-modal/points-modal.component';
import { PointsComponent } from './points.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule
    ],
    declarations: [
        PointsComponent,
        PointsModalComponent
    ],
    exports: [
        PointsComponent,
        PointsModalComponent
    ]

})
export class PointsModule { }
