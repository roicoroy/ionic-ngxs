import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WaiterActions } from '../actions/waiter.action';
import { Waiter } from '../models';
import { WaiterState } from '../states/waiter.state';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.page.html',
  styleUrls: ['./entry-form.page.scss'],
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
  ],
})
export class EntryFormPage implements OnInit {
  @Select(WaiterState.getWaiterList) waitersList: Observable<Waiter[]>;
  @ViewChild('waitersFormRef', { static: false }) waitersFormRef: NgForm;

  waitersListForm: FormGroup;
  entryForm: FormGroup;
  validationMessages = {
    tipsAmout: [
      { type: 'required', message: 'tipsAmout is required' }
    ],
    date: [
      { type: 'required', message: 'Date is required' }
    ],
  };
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private navCtrl: NavController
  ) { }
  get waitersListArray() {
    return this.waitersListForm.get('waitersList') as FormArray;
  }
  waitersListArrayControl(i) {
    return this.waitersListArray.controls[i].get('waiter') as FormControl;
  }
  ngOnInit() {
    this.store.dispatch(new WaiterActions.Get());
    this.waitersList.subscribe((waitersList) => {
      this.setupForm(waitersList);
    });

  }
  setupForm(waitersListData) {
    this.waitersListForm = this.formBuilder.group({
      waitersList: this.formBuilder.array([
        ...this.createFormArray(waitersListData)
      ])
    });
    this.entryForm = this.formBuilder.group({
      date: ['', Validators.required],
      tipsAmout: ['', Validators.required],
    });
  }
  createField(name, totalPoints, pointsList): FormGroup {
    return this.formBuilder.group({
      name: [name, Validators.required],
      totalPoints: [totalPoints],
      hours: ['', Validators.required],
      pointsList: [pointsList, Validators.required],
    });
  }
  createFormArray(waitersListData: Waiter[]): FormGroup[] {
    const count = waitersListData.length;
    const arr = [];
    for (let i = 0; i < count; i++) {
      const totalPoints = [];
      console.log(waitersListData[i].pointsList);
      if (waitersListData[i].pointsList != null || waitersListData[i].pointsList !== undefined) {
        waitersListData[i].pointsList.forEach((point, ind) => {
          totalPoints.push(point.value);
        });
      }
      arr.push(this.createField(waitersListData[i].name, this.sumPointsArray(totalPoints), waitersListData[i].pointsList));
    }
    return arr;
  }
  sumPointsArray(array) {
    const sum = array.reduce((a, b) => a + b, 0);
    return sum;
  }
  testPage() {
    this.navCtrl.navigateForward('test-page');
  }
  homePage() {
    this.navCtrl.navigateForward('home');
  }
  submitForm() {
    console.log(this.waitersListForm);
  }
}
