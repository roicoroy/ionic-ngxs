import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  // @Select(EntryState.getEntryList) entriesListState: Observable<Entry[]>;

  sub: Subscription;
  teamEntry;
  details;
  constructor(
    // private storage: Storage,
    private navCtrl: NavController,
    // private ionStorageService: IonStorageService,
    private route: ActivatedRoute,
    // private store: Store
  ) { }
  ngOnInit() {
    // this.store.dispatch(new EntryActions.GetEntries());
    this.sub = this.route.queryParams.subscribe(params => {
      this.teamEntry = JSON.parse(params.teamEntry);
      this.details = params.details;
      // console.log(this.teamEntry);
    });
  }
  home() {
    this.navCtrl.navigateRoot('/home', {
      animated: true,
      animationDirection: 'back',
    });
  }
  ionViewDidLeave() {
    this.sub.unsubscribe();
  }
}
