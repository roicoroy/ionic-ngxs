/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.page.html',
  styleUrls: ['./test-page.page.scss'],
})
export class TestPagePage implements OnInit {

  entryForm: FormGroup;

  waitersListForm: FormGroup;

  points: FormControl;

  validation_messages = {
    tipsAmout: [
      { type: 'required', message: 'tipsAmout is required' }
    ],
    date: [
      { type: 'required', message: 'Date is required' }
    ],
  };

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    this.entryForm = this.fb.group({
      date: ['', Validators.required],
      tipsAmout: ['', Validators.required],
    });
    this.waitersListForm = this.fb.group({
      name: [''],
      hours: [this.points],
      points: [[]],
    });
  }

  onSubmitAccountDetails(value: any) {
    console.log(value);
  }

  onSubmit() {
    console.log(this.entryForm.value);
  }
  addPoints() {

  }
  addHours() {

  }
  entryFormPage() {
    this.navCtrl.navigateRoot('entry-form');
  }
}
