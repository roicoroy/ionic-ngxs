/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { BehaviorSubject, Observable } from 'rxjs';
// import { IonStorageService, WaitersService, WAITERS_LIST_KEY } from '../services';
// import { Waiter } from '../types/waiters.type';
import { Storage } from '@ionic/storage-angular';
import { map } from 'rxjs/operators';
import { el } from 'date-fns/locale';
import { Waiter } from '../models/waiters.type';
import { IonStorageService } from '../services';
import { WaitersService } from '../services/waiters.service';
import { WaiterState, WAITERS_LIST_KEY } from '../states/waiter.state';
import { Select, Store } from '@ngxs/store';
import { WaiterActions } from '../actions/waiter.action';
import { Point } from '../models/point.type';
import { PointsState } from '../states/point.state';
export const LOCAL_WAITERS = 'localWaiters';
export const SELECTED_WAITER = 'selectedWaiter';
@Component({
  selector: 'app-test-array',
  templateUrl: './test-array.page.html',
  styleUrls: ['./test-array.page.scss'],
  animations: [
    trigger('fade', [
      transition('void => active', [
        style({
          opacity: 0
        }),
        animate(1000, style({
          opacity: 1
        }))
      ]),
      transition('* => void', [
        animate(1000, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class TestArrayPage implements OnInit {
  @Select(WaiterState.getWaiterList) waitersList: Observable<Waiter[]>;
  @Select(PointsState.getPointsList) pointsList: Observable<Point[]>;

  waitersListForm: FormGroup;
  waiter: FormControl;
  constructor(
    private navCtrl: NavController,
    private waiterService: WaitersService,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    public ionStorageService: IonStorageService,
    private storage: Storage,
    private store: Store
  ) { }
  get waitersListArray() {
    return this.waitersListForm.get('waitersList') as FormArray;
  }
  waitersListArrayControl(i) {
    return this.waitersListArray.controls[i].get('waiter') as FormControl;
  }
  ngOnInit() {
    this.store.dispatch(new WaiterActions.Get());
    this.waitersList.subscribe((list) => {
      this.setupForm(list);
    });
  }
  ionViewWillEnter() {
  }
  getWaitersListData(): any {
  }
  setupForm(waitersListData) {
    this.waitersListForm = this.formBuilder.group({
      waitersList: this.formBuilder.array([
        ...this.createFormArray(waitersListData)
      ])
    });
  }
  createField(name): FormGroup {
    return this.formBuilder.group({
      name,
    });
  }

  createFormArray(waitersListData: Waiter[]): FormGroup[] {
    const count = waitersListData.length;
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(this.createField(waitersListData[i].name));
    }
    return arr;
  }

  deleteWaiter(i: number) {
    if (this.waitersListArray.length <= 1) {
      this.alertMessage('you need at least 1 waiter in the form array');
    } else {
      this.waitersListArray.removeAt(i);
    }
  }
  submitForm() {
    console.log(this.waitersListForm.value.waitersList);
  }
  async alertMessage(message) {
    const alert = await this.alertController.create({
      message: `message:: ${message}`,
      buttons: ['OK']
    });
    alert.present();
  }
  home() {
    this.navCtrl.navigateForward('home');
  }
  ionViewWillLeave() {
  }
}
