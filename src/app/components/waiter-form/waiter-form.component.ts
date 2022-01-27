import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WaiterActions } from 'src/app/actions/waiter.action';
import { Waiter } from 'src/app/models/Waiter';
import { WaiterState } from 'src/app/states/waiter.state';

@Component({
  selector: 'app-waiter-form',
  templateUrl: './waiter-form.component.html',
  styleUrls: ['./waiter-form.component.scss'],
})
export class WaiterFormComponent implements OnInit {
  @Select(WaiterState.getSelectedWaiter) selectedWaiter: Observable<Waiter>;
  waiterForm: FormGroup;
  editWaiter = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.selectedWaiter
      .subscribe((waiter: Waiter) => {
        if (waiter) {
          this.waiterForm.patchValue({
            id: waiter.id,
            name: waiter.name
          });
          this.editWaiter = true;
        } else {
          this.editWaiter = false;
        }
      });
  }
  createForm() {
    this.waiterForm = this.fb.group({
      id: [''],
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.editWaiter) {
      this.store.dispatch(new WaiterActions.Update(this.waiterForm.value, this.waiterForm.value.id) )
        .subscribe(() => {
          this.clearForm();
        });
    } else {
      console.log(this.waiterForm.value);
      this.store.dispatch(new WaiterActions.Add(this.waiterForm.value))
        .subscribe(() => {
          this.clearForm();
        });
    }
  }
  clearForm() {
    this.waiterForm.reset();
    this.store.dispatch(new WaiterActions.SetSelected(null));
  }
}
