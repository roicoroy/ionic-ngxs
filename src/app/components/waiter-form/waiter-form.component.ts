import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { WaiterActions } from 'src/app/actions/waiter.action';

@Component({
  selector: 'app-waiter-form',
  templateUrl: './waiter-form.component.html',
  styleUrls: ['./waiter-form.component.scss'],
})
export class WaiterFormComponent implements OnInit {
  waiterForm: FormGroup;
  editWaiter = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.waiterForm = this.fb.group({
      id: [''],
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    this.store.dispatch(new WaiterActions.Add(this.waiterForm.value))
      .subscribe(() => {
        this.clearForm();
      });
  }
  clearForm() {
    this.waiterForm.reset();
  }
}
