import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'doku-info-tooltip-icon',
  templateUrl: './info-tooltip-icon.component.html',
  styleUrls: ['./info-tooltip-icon.component.scss']
})
export class InfoTooltipIconComponent {

  templateRef: TemplateRef<any>;
  hint: string;

}
