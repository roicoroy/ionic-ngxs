import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(
    private router: Router,
    public popoverController: PopoverController
  ) { }

  ngOnInit() { }
  home() {
    this.router.navigateByUrl('tabs/home').then(() => {
      this.popoverController.dismiss();
    });
  }
}
