import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as nanoid from 'nanoid';
import { Waiter } from '../models/waiters.type';

export const WAITERS_LIST_KEY = 'waitersList';
@Injectable({
  providedIn: 'root'
})
export class WaitersService {
  constructor(
    private storage: Storage,
  ) { }
  // Read
  getItems(): Promise<Waiter[]> {
    return this.storage.get(WAITERS_LIST_KEY);
  }
  // Create
  addItem(item: Waiter): Promise<Waiter[]> {
    item.id = nanoid(12);
    console.log(item);
    return this.storage.get(WAITERS_LIST_KEY)
      .then((formItems: Waiter[]) => {
        console.log(formItems);
        if (formItems) {
          formItems.push(item);
          return this.storage.set(WAITERS_LIST_KEY, formItems);
        } else {
          return this.storage.set(WAITERS_LIST_KEY, [item]);
        }
      });
  }
  // Update
  updateItem(item: Waiter): Promise<any> {
    return this.storage.get(WAITERS_LIST_KEY)
      .then((formItems: Waiter[]) => {
        if (!formItems || formItems.length === 0) {
          return null;
        }
        const newFormItem: Waiter[] = [];
        for (const form of formItems) {
          if (form.id === item.id) {
            newFormItem.push(item);
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
