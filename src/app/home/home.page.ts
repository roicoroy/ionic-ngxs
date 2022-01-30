import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TeamEntry, TEAM_ENTRY } from '../calculator-ngxs/calculator-ngxs.page';
import { EntriesService, IonStorageService } from '../services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public teamEntryArray: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  sub: Subscription;
  data;
  constructor(
    private navCtrl: NavController,
    private entries: EntriesService,
    private ionStorageService: IonStorageService,
  ) { }
  ngOnInit() {
    this.sub = this.ionStorageService.getKeyAsObservable(TEAM_ENTRY).subscribe((entries) => {
      this.data = entries;
      this.teamEntryArray.next(entries);
      console.log(entries);
    });
  }
  // calculator(){
  // //   this.navCtrl.navigateBack('test-array');
  // // }
  calculator() {
    this.navCtrl.navigateBack('calculator-ngxs');
  }
  settings() {
    this.navCtrl.navigateBack('settings-ngxs');
  }
  resultPage(teamEntry) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        teamEntry: JSON.stringify(teamEntry),
      }
    };
    this.entries.addEntry(teamEntry).then(() => {
      this.navCtrl.navigateForward(['/result'], navigationExtras).then(() => {
      });
    });
  }
  deleteEntry(id) {
    this.entries.deleteEntry(id).then((result) => {
      console.log(result);
      this.teamEntryArray.next(result);
    });
  }
  deleteAll() {
    this.entries.deleteAll();
    this.teamEntryArray.next([]);
  }
}
