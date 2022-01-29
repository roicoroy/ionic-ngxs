import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private navCtrl: NavController
  ) { }
    calculator(){
      this.navCtrl.navigateBack('test-array');
    }
    // calculator(){
    //   this.navCtrl.navigateBack('calculator-ngxs');
    // }
    settings(){
      this.navCtrl.navigateBack('settings-ngxs');
    }
}
