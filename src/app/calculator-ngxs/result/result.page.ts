import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { IonStorageService } from 'src/app/services';
import { TEAM_ENTRY } from '../calculator-ngxs.page';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  sub: Subscription;
  data;
  constructor(
    // private storage: Storage,
    private navCtrl: NavController,
    private ionStorageService: IonStorageService,
  ) { }

  ngOnInit() {
    this.sub = this.ionStorageService.getKeyAsObservable(TEAM_ENTRY).subscribe((entries) => {
      this.data = entries;
      console.log(this.data);
    });
  }
  home() {
    this.navCtrl.navigateRoot('/home', {
      animated: true,
      animationDirection: 'back',
    });
  }
  ionViewDidLeave() {
    // this.sub.unsubscribe();
  }
}
