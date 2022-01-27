import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-calculator-ngxs',
  templateUrl: './calculator-ngxs.page.html',
  styleUrls: ['./calculator-ngxs.page.scss'],
})
export class CalculatorNgxsPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }
  home() {
    this.navCtrl.navigateForward('home');
  }
}
