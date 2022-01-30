import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Waiter } from 'src/app/models';

@Component({
  selector: 'app-waiter-modal',
  templateUrl: './waiter-modal.component.html',
  styleUrls: ['./waiter-modal.component.scss'],
})
export class WaiterModalComponent implements OnInit {
  @Input() waiter: Waiter;
  createWaiterForm: FormGroup;
  nameField: FormControl;
  waiterData: Waiter;
  waiterId: number;
  isEdit = null;
  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.setupForm();
    if (this.waiter === null || this.waiter === undefined) {
      this.isEdit = false;
      this.nameField.setValue('');
    } else {
      this.isEdit = true;
      this.waiterId = this.waiter.id;
      this.nameField.setValue(this.waiter.name);
    }
  }
  setupForm() {
    this.nameField = new FormControl('', Validators.required);
    return this.createWaiterForm = new FormGroup({
      name: this.nameField,
    });
  }
  addNewPoint() {
    const newWaiter = {
      name: this.createWaiterForm.value.name,
    };
    if (this.createWaiterForm.valid) {
      this.modalController.dismiss(newWaiter);
    }
  }
  saveEditedPoint() {
    const editWaiter = {
      id: this.waiterId,
      name: this.createWaiterForm.value.name,
    };
    if (this.createWaiterForm.valid) {
      this.modalController.dismiss(editWaiter);
    }
  }
  dismiss() {
    this.modalController.dismiss();
  }
  numberize(x) {
    return Number(x);
  }
}
