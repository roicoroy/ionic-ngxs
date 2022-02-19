import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Observable } from 'rxjs';
import { PointActions } from 'src/app/actions/point.action';
import { WaiterActions } from 'src/app/actions/waiter.action';
import { Point, Waiter } from 'src/app/models';
import { PointsState } from 'src/app/states/point.state';
import { WaiterState } from 'src/app/states/waiter.state';
import { WaiterModalComponent } from './waiters/waiter-modal/waiter-modal.component';

@Component({
  selector: 'app-waiters',
  templateUrl: './waiters.page.html',
  styleUrls: ['./waiters.page.scss'],
})
export class WaitersPage implements OnInit {
  @Select(WaiterState.getWaiterList) waitersList: Observable<Waiter[]>;
  @Select(PointsState.getPointsList) pointsListState: Observable<Point[]>;
  @ViewChild('selectPointsComponent') selectPointsComponent: IonicSelectableComponent;
  selectPointList = [];
  constructor(
    public modalController: ModalController,
    private store: Store,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.store.dispatch(new PointActions.Get());
    this.store.dispatch(new WaiterActions.Get());
    this.pointsListState.subscribe((response) => {
      this.selectPointList = response;
    });
  }
  async addWaiter() {
    const modal = await this.modalController.create({
      component: WaiterModalComponent,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      // newWaiter.
      const newWaiter = new Waiter({
        id: null,
        name: data.name,
        tipsShare: null,
        hours: null,
        pointsList: null,
        totalPoints: null,
      });
      console.log(newWaiter);
      this.store.dispatch(new WaiterActions.Add(newWaiter));
    }
  }
  async editWaiter(waiter, i) {
    const modal = await this.modalController.create({
      component: WaiterModalComponent,
      cssClass: 'modal-class',
      componentProps: {
        waiter,
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();

    if (data) {
      console.log(data.id);
      console.log(data.name);
      let editedWaiter;
      this.waitersList.subscribe((wlist: any) => {
        editedWaiter = new Waiter({
          id: wlist[i].id,
          name: data.name,
          tipsShare: null,
          hours: null,
          pointsList: wlist[i].pointsList,
          totalPoints: null,
        });
      });
      console.log(editedWaiter);
      // const w = new Waiter(data);
      this.store.dispatch(new WaiterActions.Update(editedWaiter, editedWaiter.id));
    }
  }
  onSelectTableChange($event, i) {
    const waiter = new Waiter({});
    this.waitersList.subscribe((response: any) => {
      waiter.id = response[i].id;
      waiter.name = response[i].name;
      waiter.pointsList = $event.value;
    });
    console.log(waiter);
    this.store.dispatch(new WaiterActions.Update(waiter, waiter.id));
  }
  deleteWaiter(id: number) {
    this.store.dispatch(new WaiterActions.Delete(id));
  }
  testPage() {
    this.navCtrl.navigateForward('test-page');
  }
  homePage() {
    this.navCtrl.navigateForward('home');
  }
  togglePoints() {
    this.selectPointsComponent.toggleItems(this.selectPointsComponent.itemsToConfirm.length ? false : true);
    // this.confirm();
  }
  confirm() {
    this.selectPointsComponent.confirm();
    this.selectPointsComponent.close();
  }
}
