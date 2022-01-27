import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PointActions } from 'src/app/actions/point.action';
import { Point } from 'src/app/models/point.type';
import { PointsState } from 'src/app/states/point.state';
import { PointsModalComponent } from './points-modal/points-modal.component';

@Component({
  selector: 'app-points-list',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent implements OnInit {
  @Select(PointsState.getPointsList) pointsList: Observable<Point[]>;

  constructor(
    public modalController: ModalController,
    private store: Store
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.store.dispatch(new PointActions.Get());
  }
  async addPoint() {
    const modal = await this.modalController.create({
      component: PointsModalComponent,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log(data);
      this.add(data);
    }
  }
  async editPoint(point) {
    const modal = await this.modalController.create({
      component: PointsModalComponent,
      cssClass: 'modal-class',
      componentProps: {
        point,
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (data) {
      this.edit(data);
    }
  }
  add(payload: Point) {
    this.store.dispatch(new PointActions.Add(payload));
  }
  delete(id: number) {
    this.store.dispatch(new PointActions.Delete(id));
  }
  edit(payload) {
    this.store.dispatch(new PointActions.Update(payload, payload.id));
  }
}
