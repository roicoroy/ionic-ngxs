/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AlertController, IonContent, IonSlides, NavController, PickerController, Platform } from '@ionic/angular';
import { IonStorageService } from '../services';
import { trigger, transition, style, animate } from '@angular/animations';
import { PointsService } from '../services/points.service';
import { BehaviorSubject, Observable } from 'rxjs';
// import { LOCAL_WAITERS } from '../test-array/test-array.page';
import { Storage } from '@ionic/storage-angular';
import { Waiter } from '../models/waiters.type';
import { WAITERS_LIST_KEY } from '../states/waiter.state';
import { Point } from '../models/point.type';
import { Select, Store } from '@ngxs/store';
import { PointsState } from '../states/point.state';
import { PointActions } from '../actions/point.action';
export const LOCAL_WAITERS = 'localWaiters';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator-ngxs.page.html',
  styleUrls: ['./calculator-ngxs.page.scss'],
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
export class CalculatorNgxsPage implements OnInit {
  @Select(PointsState.getPointsList) pointsList: Observable<Point[]>;

  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;
  @ViewChild('waitersFormRef', { static: false }) waitersFormRef: NgForm;

  toggle = true;
  group = null;
  selected = [];
  selectedHours = null;

  public date: any = new Date().toISOString();
  public slidesOpts = {
    allowTouchMove: false,
    autoHeight: true,
  };
  public slides: string[];
  public currentSlide: string;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public isBeginning: boolean = true;
  public isEnd = false;
  waitersListSlide = false;
  //
  @ViewChild('selectNameComponent') selectNameComponent: IonicSelectableComponent;
  @ViewChild('selectPointsComponent') selectPointsComponent: IonicSelectableComponent;
  waitersListData: any;
  pointsListSelect: Point[];
  pointsFromWaiter: Point[];
  selectedWaiter: Waiter;
  //
  waiterForm: FormGroup;
  waiterNameControl: FormControl;
  waitersArrayFrom: FormArray;
  public waitersListForm: FormGroup;
  get waitersListArray() {
    return this.waitersListForm.get('waitersList') as FormArray;
  }
  pointsModel;
  //validator
  isNameValidFormSubmitted: boolean | null = null;
  isPointValidFormSubmitted: boolean | null = null;
  isHoursValidFormSubmitted: boolean | null = null;
  public waitersListDataSubject: BehaviorSubject<Waiter[]> = new BehaviorSubject<Waiter[]>([]);
  backupWaitersData = [];
  deleted = [];
  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer,
    public alertController: AlertController,
    private pickerController: PickerController,
    private platform: Platform,
    private store: Store,
    // public waiterService: WaitersService,
    // private pointsService: PointsService,
    public ionStorageService: IonStorageService,
    private storage: Storage,

  ) {
    this.waitersListForm = this.formBuilder.group({
      waitersList: this.formBuilder.array([
        this.initWaitersListForm()
      ])
    });
  }
  ionViewWillEnter() {
    this.store.dispatch(new PointActions.Get());
    this.ionSlides.updateAutoHeight();
    this.ionStorageService.getKeyAsObservable(WAITERS_LIST_KEY)
      .subscribe((savedWaiters) => {
        if (savedWaiters) {
          this.waitersListData = savedWaiters;
          this.setDataUpdateSubject(this.waitersListData);
        } else {
          // this.waitersListData = this.waiterService.getWaitersList();
          this.setDataUpdateSubject(this.waitersListData);
        }
      });
    this.pointsList.subscribe((points) => {
      this.pointsListSelect = points;
      console.log(points);
    });
  }
  setDataUpdateSubject(data) {
    this.storage.set(LOCAL_WAITERS, data).then((responseData) => {
      this.waitersListDataSubject.next(responseData);
    });
  }
  ngOnInit() {
    this.buildSlides();
  }
  submitForm() {
    console.log(this.waitersListForm.value.waitersList);
    console.log(this.pointsModel);
  }
  addWaiterField(): void {
    this.ionStorageService.getKeyAsObservable(LOCAL_WAITERS).subscribe((localWaiters) => {
      const waitersListDataIndex = localWaiters.length - 1;
      if (this.waitersListArray.length <= waitersListDataIndex) {
        this.waitersListArray.push(this.initWaitersListForm());
        setTimeout(() => {
          this.ionSlides.updateAutoHeight();
          this.ionSlides.update();
        }, 50);
      } else {
        console.error('got engouth waiters in the array :)');
        this.alertMessage('got engouth waiters in the array :)');
      }
    });

  }
  initWaitersListForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      points: [[], Validators.required],
      hours: ['', Validators.required],
    });
  }
  deleteWaiter(i: number) {
    if (this.waitersListArray.length <= 1) {
      console.error('you need at least 1 waiter in the form array');
      this.alertMessage('you need at least 1 waiter in the form array');
    } else {
      this.waitersListArray.removeAt(i);
      setTimeout(() => {
        this.ionSlides.updateAutoHeight();
        this.ionSlides.update();
      }, 50);
    }
  }
  //
  onPointsListChange(event, i) {
    console.log(event);
    if (this.waitersListArray.controls[i].get('points') !== null || this.waitersListArray.controls[i].get('points') !== undefined) {
      this.waitersListArray.controls[i].get('points').setValue(event.value);
    }

    setTimeout(() => {
      this.ionSlides.updateAutoHeight();
      this.ionSlides.update();
    }, 50);
  }
  togglePoints() {
    this.selectPointsComponent.toggleItems(this.selectPointsComponent.itemsToConfirm.length ? false : true);
    // this.confirm();
  }
  confirm() {
    this.selectPointsComponent.confirm();
    this.selectPointsComponent.close();
  }
  confirmWaiters() {
    this.selectNameComponent.confirm();
    this.selectNameComponent.close();
  }
  //
  waitersListArrayControl(i) {
    return this.waitersListArray.controls[i].get('name') as FormControl;
  }
  returnWaiter(i) {
    let waiterToReturn;
    if (this.waitersListArrayControl(i).value) {
      waiterToReturn = this.waitersListArrayControl(i).value;
      this.waitersListData.push(waiterToReturn);
      this.waitersListDataSubject.next(this.waitersListData);
      this.deleted.pop();
      this.waitersListArray.controls[i].get('name').setValue('');
    } else {
      this.alertMessage('no waiter to return...');
    }
  }
  async alertMessage(message) {
    const alert = await this.alertController.create({
      message: `message:: ${message}`,
      buttons: ['OK']
    });
    alert.present();
  }
  waitersListChange(event: any, index) {
    console.log(event.value);

    const name: Waiter = event.value;
    const controlValue = this.waitersListArrayControl(index);
    const arr: Waiter[] = this.waitersListData;
    console.log(this.deleted);


    if (this.waitersListArrayControl(index) !== null || this.waitersListArrayControl(index) !== undefined) {
      if (controlValue.value.name === event.value.name) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === name) {
            const deleted = arr.splice(i, 1);
            this.deleted.push(...deleted);
          }
        }
        console.log(this.deleted);
        console.log(arr);
        this.waitersListDataSubject.next(arr);
        this.waitersListArrayControl(index).setValue(name);
      } else {
        // this.waitersListDataSubject.next(arr);
        return;

        // this.waitersListArrayControl(index).setValue(name);
      }
    }
    if (this.waitersListArray.controls[index].get('points') !== null || this.waitersListArray.controls[index].get('points') !== undefined) {
      this.waitersListArray.controls[index].get('points').setValue(event.value.points);
    }
    if (this.waitersListArray.controls[index].get('hours') !== null || this.waitersListArray.controls[index].get('hours') !== undefined) {
      this.waitersListArray.controls[index].get('hours').setValue(event.value.hours);
    }
  }
  onAddNewWaiter(event: any) {
    // console.log(event);
    this.waiterNameControl.reset();
    event.component.showAddItemTemplate();
  }
  addOnWaitersList() {
    const waiter = new Waiter(
      {
        // id: this.waiterService.getNewWaiterId(),
        name: this.waiterNameControl.value,
      }
    );
    // this.waiterService.addNewWaiter(waiter);
    this.selectNameComponent.hideAddItemTemplate();
  }
  onAddWaitersList(event: any) {
    // console.log(event);
    this.waiterNameControl.reset();
    event.component.showAddItemTemplate();
  }
  saveOnWaitersList(waiter: Waiter) {
    waiter.name = this.waiterNameControl.value;
    this.selectNameComponent.hideAddItemTemplate();
  }
  onDeleteWaiter(event: any) {
    // this.waiterService.deleteWaiter(event.item);
    event.component.deleteItem(event.item);
  }
  resetWaitersListForm() {
    this.waitersListArray.reset();
    this.waitersFormRef.reset();
    this.deleted = [];
    this.ionStorageService.getKeyAsObservable(LOCAL_WAITERS).subscribe((localWaiters) => {
      this.waitersListDataSubject.next(localWaiters);
      this.waitersListData = localWaiters;
    });
  }
  //Select Points
  // clearSelectedName(i) {
  //   this.waitersListArray.controls[i].get('name').reset();
  //   this.waitersListArray.controls[i].get('name').setErrors(null);
  //   this.waitersListArray.controls[i].get('name').updateValueAndValidity();
  //   this.selectNameComponent.clear();
  //   this.isNameValidFormSubmitted = true;
  // }
  clearSelectedPoints(i) {
    this.waitersListArray.controls[i].get('points').reset();
    this.waitersListArray.controls[i].get('points').setErrors(null);
    this.waitersListArray.controls[i].get('points').updateValueAndValidity();
    this.selectPointsComponent.clear();
    this.isPointValidFormSubmitted = true;
  }
  clearSelectedHour(i) {
    // const localControl = control as FormControl;
    // localControl.reset();
    this.waitersListArray.controls[i].get('hours').reset();
    this.waitersListArray.controls[i].get('hours').setErrors(null);
    this.waitersListArray.controls[i].get('hours').updateValueAndValidity();
    this.isHoursValidFormSubmitted = true;
  }
  // Slides
  buildSlides() {
    const slides = ['Waiters List', 'Date', 'Tips', 'Summary'];
    this.currentSlide = slides[0];
    this.slides = slides;
  }
  isNameValid = true;
  async onNextButtonTouched() {
    if (this.currentSlide === 'Date') {
      console.log('date');
      this.ionSlides.slideNext();
      this.ionContent.scrollToTop();
    }
    else if (this.currentSlide === 'Tips') {
      console.log('Tips');
      this.ionSlides.slideNext();
      this.ionContent.scrollToTop();
    }
    else if (this.currentSlide === 'Waiters List') {
      // this.isValidFormSubmitted = false;
      console.log('submit', this.waitersListForm.value.waitersList);
      this.isNameValidFormSubmitted = false;
      this.isPointValidFormSubmitted = false;
      this.isHoursValidFormSubmitted = false;
      if (this.waitersListForm.invalid) {
        this.isNameValidFormSubmitted = false;
        this.isPointValidFormSubmitted = false;
        this.isHoursValidFormSubmitted = false;
        console.log('valid');
        setTimeout(() => {
          // this.ionSlides.updateAutoHeight();
          // this.ionSlides.update();
        }, 50);
        return;
      }
      if (this.waitersListForm.valid) {
        this.isNameValidFormSubmitted = true;
        this.isPointValidFormSubmitted = true;
        this.isHoursValidFormSubmitted = true;
        this.ionSlides.updateAutoHeight();
        // this.ionSlides.slideNext();
        // this.ionContent.scrollToTop();
      }
    }
    else if (this.currentSlide === 'Summary') {
      console.log('Summary');
    }
  }

  async onSlidesChanged() {
    const index = await this.ionSlides.getActiveIndex();
    this.currentSlide = this.slides[index];
    this.isBeginning = await this.ionSlides.isBeginning();
    this.isEnd = await this.ionSlides.isEnd();
    this.ionSlides.updateAutoHeight();
  }
  onSlidesDidChange() {
    this.ionContent.scrollToTop();
  }
  onBackButtonTouched() {
    this.ionSlides.slidePrev();
    this.ionContent.scrollToTop();
  }
  home() {
    this.navCtrl.navigateRoot('/home', {
      animated: true,
      animationDirection: 'back',
    });
  }
  async showPicker(i) {
    const settings = {
      cssClass: 'pickerClassName',
      buttons: [
        {
          text: 'Reset',
          role: 'cancel',
          handler: (e) => {
            this.selectedHours = null;
          }
        },
        {
          text: 'Ok',
          handler: (e) => {
            console.log(e);
            const hours = e.hours.value;
            const quarters = e.quarters.value;
            const hoursString: any = [`${hours}.${quarters}`];
            const hoursNumber: number = parseFloat(hoursString);

            const hoursFormArray: any = this.waitersListArray.controls[i];
            hoursFormArray.controls.hours.setValue(hoursNumber);
            hoursFormArray.controls.hours.setErrors(null);
            hoursFormArray.updateValueAndValidity();
            this.selectedHours = hoursFormArray.controls.hours.value;
            // console.log(this.selectedHours);
          },
        }
      ],
      columns: [
        {
          name: 'hours',
          options: [
            {
              text: '1',
              value: 1
            },
            {
              text: '2',
              value: 2
            },
            {
              text: '3',
              value: 3
            },
            {
              text: '4',
              value: 4
            },
            {
              text: '5',
              value: 5
            },
            {
              text: '6',
              value: 6
            },
            {
              text: '7',
              value: 7
            },
            {
              text: '8',
              value: 8
            },
            {
              text: '9',
              value: 9
            },
            {
              text: '10',
              value: 10
            },
            {
              text: '11',
              value: 11
            },
            {
              text: '12',
              value: 12
            },
            {
              text: '13',
              value: 13
            },
          ]
        },
        {
          name: 'quarters',
          options: [
            {
              text: '00',
              value: 0
            },
            {
              text: '25',
              value: 25
            },
            {
              text: '50',
              value: 50
            },
            {
              text: '75',
              value: 75
            },
          ]
        }
      ],
    };
    const picker = await this.pickerController.create(settings);
    picker.present();
  }
}
