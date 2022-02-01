import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoTooltipDirective } from './info-tooltip/info-tooltip.directive';
import { InfoTooltipIconComponent } from './info-tooltip/info-tooltip-icon/info-tooltip-icon.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [InfoTooltipDirective, InfoTooltipIconComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [InfoTooltipDirective, InfoTooltipIconComponent],
  entryComponents: [InfoTooltipIconComponent]
})
export class DirectivesModule { }
