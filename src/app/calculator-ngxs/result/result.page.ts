import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params.teamEntry);
      // this.data = params.teamEntry;
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
