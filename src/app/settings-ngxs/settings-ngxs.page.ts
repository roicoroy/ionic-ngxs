/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable max-len */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Point } from '../models/point.type';
import { PointsState } from '../states/point.state';
import { Storage } from '@ionic/storage-angular';
import { POINTS_LIST_KEY } from '../services';

@Component({
   selector: 'app-settings-ngxs',
   templateUrl: './settings-ngxs.page.html',
   styleUrls: ['./settings-ngxs.page.scss'],
})
export class SettingsNgxsPage implements OnInit {
   @ViewChild('slider') slider: IonSlides;
   page;
   slideOpts = {
   };
   constructor(
      private navCtrl: NavController,
   ) { }
   ngOnInit() {
   }
   ionViewDidEnter() {
      // this.selectedTab(0);
      this.page = 0;
   }
   selectedTab(index: number) {
      this.slider.slideTo(index);
   }
   async moveButton() {
      const index = await this.slider.getActiveIndex();
      this.page = index.toString();
   }
   segmentChanged(ev: any) {
      // console.log('Segment changed', ev);
   }
   home() {
      this.navCtrl.navigateBack('home').then(() => {
         // this.pointsList.subscribe((points) => {
         //    console.log(points);
         //    this.storage.set(POINTS_LIST_KEY, points);
         // });
      });
   }
}
