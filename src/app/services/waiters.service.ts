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
    return this.ionStorageService.getKeyAsObservable(WAITERS_LIST_KEY).pipe(tap((waitersListResponse) => {
      if (!waitersListResponse) {
        const myHttp = this.http.get<Waiter[]>(`${this.baseUrl}/waiters`);
        myHttp.subscribe(
          (res)=>{
            console.log(res);
           },
          (error)=>{
            console.log(error);
          },

        );
      } else {
        return waitersListResponse;
      }
    }));
  }
  addWaiter(payload: Waiter) {
    if (payload) {
      payload.id = nanoid(12);
      console.log(payload);
      this.addItem(payload).then((res) => {
        console.log(res);

      });
      return this.http.post<Waiter>(`${this.baseUrl}/waiters`, payload);
    }
  }
  updateWaiter(payload: Waiter, id: number) {
    this.updateItem(payload);
    return this.http.put<Waiter>(`${this.baseUrl}/waiters/${id}`, payload);
  }
  deleteWaiter(id: number) {
    this.deleteItem(id);
    return this.http.delete(`${this.baseUrl}/waiters/${id}`);
  }
  // Add on Storage
  addItem(item: Waiter): Promise<any> {
    // Specify a the return of a promess to use then block get the item was added
    return this.storage.get(WAITERS_LIST_KEY)
      .then((resWaiters: Waiter[]) => {
        // Check if exist push it or return set ;
        if (resWaiters) {
          resWaiters.push(item);
          return this.storage.set(WAITERS_LIST_KEY, resWaiters); // Return array with added form
        } else {
          return this.storage.set(WAITERS_LIST_KEY, [item]); // Return the same array
        }
      });
  }
  // Update
  updateItem(item: Waiter): Promise<any> {
    return this.storage.get(WAITERS_LIST_KEY)
      .then((formItems: Waiter[]) => {
        // If items does not exist or length is 0 return null
        if (!formItems || formItems.length === 0) {
          return null;
        }
        const newFormItem: Waiter[] = [];

        // Loop througth the array and check if exist the added item
        for (const form of formItems) {
          if (form.id === item.id) {
            newFormItem.push(item); // Push newItem
          } else {
            newFormItem.push(form);
          }
        }
        return this.storage.set(WAITERS_LIST_KEY, newFormItem);
      });
  }
  // Delete
  deleteItem(id: number): Promise<any> {
    return this.storage.get(WAITERS_LIST_KEY)
      .then((formItems: Waiter[]) => {
        if (!formItems || formItems.length === 0) {
          return null;
        }
        const formsToKeep: Waiter[] = [];
        for (const form of formItems) {
          if (form.id !== id) {
            formsToKeep.push(form);
          }
        }
        return this.storage.set(WAITERS_LIST_KEY, formsToKeep);
      });
  }
}
