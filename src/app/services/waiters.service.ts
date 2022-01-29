/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import * as nanoid from 'nanoid';
import { IonStorageService } from '.';
import { Waiter } from '../models/waiters.type';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

export const WAITERS_LIST_KEY = 'waitersList';
@Injectable({
  providedIn: 'root'
})
export class WaitersService {
  public waitersListSubject: BehaviorSubject<Waiter[]> = new BehaviorSubject<Waiter[]>([]);
  private baseUrl: string;
  errorMsg;
  private waitersList: Waiter[] = [
    new Waiter({
      id: 0,
      name: 'Jose',
      // tipsShare: 0,
      // hours: 1.25,
    }),
    new Waiter({
      id: 1,
      name: 'Mary',
      // tipsShare: 0,
      // hours: 4.50,
    }),
    new Waiter({
      id: 2,
      name: 'Joe',
      // tipsShare: 0,
      // hours: 4.50,
      // points: [
      //   new Points({ id: 0, label: 'Speak English', value: 0.5, type: 'checkbox' }),
      //   new Points({ id: 1, label: 'Answer Phone', value: 0.5, type: 'checkbox' }),
      // ],
    }),
    // new Waiter({
    //   id: 0,
    //   name: 'Jose',
    //   tipsShare: 0,
    //   hours: 4.75,
    //   points: [
    //     new Points({ id: 0, label: 'Speak English', value: 0.5, type: 'checkbox' }),
    //     new Points({ id: 1, label: 'Answer Phone', value: 0.5, type: 'checkbox' }),
    //   ],
    // }),
    // new Waiter({
    //   id: 1,
    //   name: 'Mary',
    //   tipsShare: 0,
    //   hours: 2.50,
    //   points: [
    //     new Points({ id: 0, label: 'Speak English', value: 0.5, type: 'checkbox' }),
    //   ],
    // }),
  ];
  constructor(
    private storage: Storage,
    private ionStorageService: IonStorageService,
    private http: HttpClient
  ) {
    this.baseUrl = environment.API_URL;
  }
  // getWaitersList(): Waiter[] {
  //   let waitersList = [];
  //   waitersList = this.waitersList;
  //   return waitersList;
  // }
  // getWaitersListObservable(): Observable<Waiter[]> {
  //   return of(this.getWaitersList());
  // }
  // setupWaitersOnStorage() {
  //   this.ionStorageService.getKeyAsObservable(WAITERS_LIST_KEY).subscribe((waitersList) => {
  //     if (!waitersList) {
  //     } else {
  //       this.updateWaiterOnStorage(waitersList);
  //     }
  //   });
  // }
  // updateWaiterOnStorage(waitersList) {
  //   return this.storage.set(WAITERS_LIST_KEY, waitersList);
  // }
  fetchWaiters() {
    // return this.ionStorageService.getKeyAsObservable(WAITERS_LIST_KEY).pipe(tap((waitersListResponse) => {
    //   if (!waitersListResponse) {
    //     this.storage.set(WAITERS_LIST_KEY, this.waitersList);
    //   }
    // }));
    // return this.http.get<Waiter[]>(`${this.baseUrl}/waiters`);
  }
  addWaiter(payload: Waiter): Observable<Waiter> {
    return;
    // if (payload) {
    //   payload.id = nanoid(12);
    //   console.log(payload);
    //   let add;
    //   this.addItem(payload).then((res) => {
    //     console.log(res);
    //     add = res;
    //   });
    //   console.log(add);
    //   // console.log(add);
    //   // .then((res) => {
    //   //   console.log(res);
    //   // });
    //   return of(add);
      // return this.http.post<Waiter>(`${this.baseUrl}/waiters`, payload);
    // }
  }
  updateWaiter(payload: Waiter, id: number) {
    // this.updateItem(payload);
    // return this.http.put<Waiter>(`${this.baseUrl}/waiters/${id}`, payload);
  }
  deleteWaiter(id: number) {
    // this.deleteItem(id);
    // return this.http.delete(`${this.baseUrl}/waiters/${id}`);
  }

}
