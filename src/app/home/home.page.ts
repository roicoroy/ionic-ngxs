import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { EntryActions } from '../actions/entries.actions';
import { TeamEntry, TEAM_ENTRY } from '../calculator-ngxs/calculator-ngxs.page';
import { Entry } from '../models';
import { EntriesService, IonStorageService } from '../services';
import { EntryState } from '../states/entries.state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @Select(EntryState.getEntryList) entriesListState: Observable<Entry[]>;
  sub: Subscription;
  data;
  constructor(
    private navCtrl: NavController,
    private entries: EntriesService,
    // private ionStorageService: IonStorageService,
    private store: Store
  ) { }
  ngOnInit() {
    this.store.dispatch(new EntryActions.GetEntries());
  }
  calculator() {
    this.navCtrl.navigateForward('entry-form');
  }
  settings() {
    this.navCtrl.navigateBack('settings/tabs/waiters');
  }
  resultPage(teamEntry) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        teamEntry: JSON.stringify(teamEntry),
        details: true
      }
    };
    this.navCtrl.navigateForward(['/result'], navigationExtras);
  }
  deleteEntry(id) {
    this.entries.deleteEntry(id).then((result) => {
      console.log(result);
      this.store.dispatch(new EntryActions.DeleteEntry(result)).subscribe(()=>{
        this.store.dispatch(new EntryActions.GetEntries());
      });
    });
  }
  deleteAll() {
    // this.entries.deleteAll();
    // this.teamEntryArray.next([]);
  }
}
