/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AlertController, IonContent, IonSelect, IonSlides, NavController, PickerController, Platform } from '@ionic/angular';
import { EntriesService, IonStorageService } from '../services';
import { trigger, transition, style, animate } from '@angular/animations';
import { PointsService } from '../services/points.service';
import { BehaviorSubject, Observable } from 'rxjs';
// import { LOCAL_WAITERS } from '../test-array/test-array.page';
import { Storage } from '@ionic/storage-angular';
import { Waiter } from '../models/waiters.type';
import { WaiterState, WAITERS_LIST_KEY } from '../states/waiter.state';
import { Point } from '../models/point.type';
import { Select, Store } from '@ngxs/store';
import { PointsState } from '../states/point.state';
import { PointActions } from '../actions/point.action';
import { WaiterActions } from '../actions/waiter.action';
import { NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import * as nanoid from 'nanoid';
import { TooltipEvent } from '../components/ionic4-tooltips/src/models/tooltip-event.model';
export const LOCAL_WAITERS = 'localWaiters';
export const TEAM_ENTRY = 'teamEntry';
import { MatTooltip } from '@angular/material/tooltip';
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
  ],
  providers: [MatTooltip]
})
export class CalculatorNgxsPage implements OnInit {
  @Select(PointsState.getPointsList) pointsList: Observable<Point[]>;
  @Select(WaiterState.getWaiterList) waitersList: Observable<Waiter[]>;

  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;
  @ViewChild(IonSelect, { static: false }) ionSelect: IonSelect;
  @ViewChild('waitersFormRef', { static: false }) waitersFormRef: NgForm;
  @ViewChild('dateFormRef', { static: false }) dateFormRef: NgForm;
  @ViewChild('tipsFormRef', { static: false }) tipsFormRef: NgForm;

  toggle = true;
  group = null;
  selected = [];
  selectedHours = null;

  public dateForm: FormGroup;
  // public date: any = new Date().toISOString();
  date = new FormControl(new Date());
  // serializedDate = new FormControl(new Date().toISOString());
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
  @ViewChild('selectPointsComponent', { static: true }) selectPointsComponent: IonicSelectableComponent;
  // @ViewChild(IonicSelectableComponent, { static: true }) selectPointsComponent: IonicSelectableComponent;
  waitersListData: any;
  pointsListSelect: Point[];
  pointsFromWaiter: Point[];
  selectedWaiter: Waiter;
  //
  public tipsForm: FormGroup;
  tipsControl: FormControl;
  //
  waiterForm: FormGroup;
  // waiterNameControl: FormControl;
  // waitersArrayFrom: FormArray;
  public waitersListForm: FormGroup;
  //validatorS
  isNameValidFormSubmitted: boolean | null = null;
  isPointValidFormSubmitted: boolean | null = null;
  isHoursValidFormSubmitted: boolean | null = null;
  isTipsValidFormSubmitted: boolean | null = null;

  localData = [];

  debounce = 0;
  duration = 3000;
  showArrow = true;
  showToggleTooltip = false;
  tooltipEvent: TooltipEvent = TooltipEvent.CLICK;


  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    public alertController: AlertController,
    private pickerController: PickerController,
    private store: Store,
    private storage: Storage,
    private entries: EntriesService,
    public tooltip: MatTooltip
  ) { }
  get waitersListArray() {
    return this.waitersListForm.get('waitersList') as FormArray;
  }
  waitersListArrayControl(i) {
    return this.waitersListArray.controls[i].get('waiter') as FormControl;
  }
  get dateControl(): AbstractControl {
    return this.dateForm.get('date');
  }
  get paymentNumber(): AbstractControl {
    return this.tipsForm.get('tips');
  }
  ionViewWillEnter() {
    this.store.dispatch(new PointActions.Get());
    this.store.dispatch(new WaiterActions.Get());
    this.ionSlides.updateAutoHeight();
    this.ionContent.scrollToTop();
  }
  ngOnInit() {
    this.buildSlides();
    this.waitersList.subscribe((waitersList) => {
      this.setupForm(waitersList);
    });
    this.pointsList.subscribe((pointsList) => {
      this.pointsListSelect = pointsList;
    });
  }
  setupForm(waitersListData) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    // this.dateForm = new FormGroup({
    //   date: new FormControl(new Date(year, month, 13)),
    // });
    this.waitersListForm = this.formBuilder.group({
      waitersList: this.formBuilder.array([
        ...this.createFormArray(waitersListData)
      ])
    });
    this.tipsControl = new FormControl('', [
      Validators.required,
    ]);
    this.tipsForm = new FormGroup({
      tips: this.tipsControl,
    });
  }
  updateFormDate(value: any) {
    this.dateForm.get('date').setValue(value);
  }
  createField(name): FormGroup {
    return this.formBuilder.group({
      name: [name, Validators.required],
      points: [''],
      hours: ['', Validators.required],
      pointsArray: [[], Validators.required],
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
  onPointsListChange(event, i) {
    if (this.waitersListArray.controls[i].get('pointsArray') !== null || this.waitersListArray.controls[i].get('points') !== undefined) {
      this.waitersListArray.controls[i].get('pointsArray').setValue(event.value);
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
    this.selectPointsComponent.close(); //.catch(()=>{});
  }
  clearSelectedPoints(i) {
    this.waitersListArray.controls[i].get('pointsArray').reset();
    this.waitersListArray.controls[i].get('pointsArray').setErrors(null);
    this.waitersListArray.controls[i].get('pointsArray').updateValueAndValidity();
    // this.selectPointsComponent.clear();
    this.isPointValidFormSubmitted = true;
  }
  clearSelectedHour(i) {
    this.waitersListArray.controls[i].get('hours').reset();
    this.waitersListArray.controls[i].get('hours').setErrors(null);
    this.waitersListArray.controls[i].get('hours').updateValueAndValidity();
    this.isHoursValidFormSubmitted = true;
  }
  //
  submitForm() {
    const sumPointsArrayValues = [];
    this.waitersListArray.controls.forEach((waitersListArray: any) => {
      waitersListArray.controls.pointsArray.value.forEach(pointsArray => {
        sumPointsArrayValues.push(pointsArray.value);
      });
      const sumPoints = this.sumPointsArray(sumPointsArrayValues);
      waitersListArray.controls.points.setValue(sumPoints);
    });
    this.buildWaiterEntryObject(this.waitersListForm.value.waitersList, this.dateForm.value.date, this.tipsForm.value.tips);
  }
  buildWaiterEntryObject(waitersList, date, tips) {
    const entryid = nanoid(12);
    const sumXValueArray = [];
    waitersList.forEach((waiter) => {
      waiter.xValue = waiter.points + waiter.hours;
      sumXValueArray.push(waiter.xValue);
    });
    const aValue = this.sumPointsArray(sumXValueArray);
    waitersList.forEach((waiter) => {
      waiter.yValue = tips / aValue;
      waiter.tipsShare = waiter.xValue * waiter.yValue;
    });
    const teamEntry = {
      id: entryid,
      tips,
      date,
      waitersList,
      aValue,
    };
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
  sumPointsArray(array) {
    const sum = array.reduce((a, b) => a + b, 0);
    return sum;
  }
  // Slides
  buildSlides() {
    const slides = ['Waiters List', 'Tips', 'Date',];
    this.currentSlide = slides[0];
    this.slides = slides;
  }
  async onNextButtonTouched() {
    if (this.currentSlide === 'Date') {
      if (this.dateForm.invalid) {
        return;
      } else {
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }
    }
    else if (this.currentSlide === 'Tips') {
      this.tipsFormRef.onSubmit(undefined);
      if (this.tipsForm.invalid) {
        this.isTipsValidFormSubmitted = true;
        return;
      } else {
        this.isTipsValidFormSubmitted = false;
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }
    }
    else if (this.currentSlide === 'Waiters List') {
      this.isNameValidFormSubmitted = false;
      this.isPointValidFormSubmitted = false;
      this.isHoursValidFormSubmitted = false;
      if (this.waitersListForm.invalid) {
        // this.isHoursValidFormSubmitted = true;
        setTimeout(() => {
          this.ionSlides.updateAutoHeight();
          this.ionSlides.update();
        }, 50);
        return;
      }
      if (this.waitersListForm.valid) {
        this.isNameValidFormSubmitted = false;
        this.isPointValidFormSubmitted = false;
        this.isHoursValidFormSubmitted = false;
        this.ionSlides.updateAutoHeight();
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }
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
            const hours = e.hours.value;
            const quarters = e.quarters.value;
            const hoursString: any = [`${hours}.${quarters}`];
            const hoursNumber: number = parseFloat(hoursString);

            const hoursFormArray: any = this.waitersListArray.controls[i];
            hoursFormArray.controls.hours.setValue(hoursNumber);
            hoursFormArray.controls.hours.setErrors(null);
            hoursFormArray.updateValueAndValidity();
            this.selectedHours = hoursFormArray.controls.hours.value;
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
  async alertMessage(message) {
    const alert = await this.alertController.create({
      message: `message:: ${message}`,
      buttons: ['OK']
    });
    alert.present();
  }
}

export class Team {
  id?: any;
  tipsMade?: number;
  date?: any;
  aValue?: number;
  waitersList?: Waiter[];
}

export class TeamEntry {
  teamEntry: Team[];
}

export class FinalWaiter extends Waiter {
  name?: any = '';
  xValue?: any;
  yValue?: any;
  tipsShare?: number;
  pointsArray?: [];
}
