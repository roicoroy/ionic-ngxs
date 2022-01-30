import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WaiterActions } from 'src/app/actions/waiter.action';
import { Waiter } from 'src/app/models';
import { WaiterState } from 'src/app/states/waiter.state';
import { WaiterModalComponent } from './waiters/waiter-modal/waiter-modal.component';

@Component({
  selector: 'app-waiters',
  templateUrl: './waiters.page.html',
  styleUrls: ['./waiters.page.scss'],
})
export class WaitersPage implements OnInit {
  @Select(WaiterState.getWaiterList) waitersList: Observable<Waiter[]>;

  constructor(
    public modalController: ModalController,
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(new WaiterActions.Get());
  }
  async addWaiter() {
    const modal = await this.modalController.create({
      component: WaiterModalComponent,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.store.dispatch(new WaiterActions.Add(data));
    }
  }
  async editWaiter(waiter) {
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
      this.store.dispatch(new WaiterActions.Update(data, data.id));
    }
  }
  deleteWaiter(id: number) {
    this.store.dispatch(new WaiterActions.Delete(id));
  }
}
