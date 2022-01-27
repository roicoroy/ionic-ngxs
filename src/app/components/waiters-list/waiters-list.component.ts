import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WaiterActions } from 'src/app/actions/waiter.action';
import { Waiter } from 'src/app/models/waiters.type';
import { WaiterState } from 'src/app/states/waiter.state';

@Component({
  selector: 'app-waiters-list',
  templateUrl: './waiters-list.component.html',
  styleUrls: ['./waiters-list.component.scss'],
})
export class WaitersListComponent implements OnInit {
  @Select(WaiterState.getWaiterList) waitersList: Observable<Waiter[]>;
  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(new WaiterActions.Get());
  }
  deleteWaiter(id: number) {
    this.store.dispatch(new WaiterActions.Delete(id));
  }
  // editWaiter(payload: Waiter) {
  //   this.store.dispatch(new WaiterActions.SetSelected(payload));
  // }
}
