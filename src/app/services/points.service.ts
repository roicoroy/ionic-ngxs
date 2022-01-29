/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IonStorageService } from '.';
import { Point } from '../models/point.type';
import * as nanoid from 'nanoid';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
export const POINTS_LIST_KEY = 'pointsList';

@Injectable({
    providedIn: 'root'
})
export class PointsService {
    private pointsList: Point[] = [
        new Point({ id: 0, label: 'Speak English', value: 0.5, type: 'checkbox' }),
        new Point({ id: 1, label: 'Answer Phone', value: 0.5, type: 'checkbox' }),
        new Point({ id: 2, label: 'Open Wine', value: 0.5, type: 'checkbox' }),
    ];
    private baseUrl: string;
    constructor(
        private storage: Storage,
        private ionStorageService: IonStorageService,
        private http: HttpClient
    ) {
        this.baseUrl = environment.API_URL;
    }
    async init() {
        return await this.storage.create();
    }

    // Read
    getItems(): Promise<Point[]> {
        return this.storage.get(POINTS_LIST_KEY);
    }
    // Create
    addItem(item: Point): Promise<Point[]> {
        item.id = nanoid(12);
        console.log(item);
        return this.storage.get(POINTS_LIST_KEY)
            .then((formItems: Point[]) => {
                console.log(formItems);
                if (formItems) {
                    formItems.push(item);
                    return this.storage.set(POINTS_LIST_KEY, formItems);
                } else {
                    return this.storage.set(POINTS_LIST_KEY, [item]);
                }
            });
    }
    // Update
    updateItem(item: Point): Promise<any> {
        return this.storage.get(POINTS_LIST_KEY)
            .then((formItems: Point[]) => {
                if (!formItems || formItems.length === 0) {
                    return null;
                }
                const newFormItem: Point[] = [];
                for (const form of formItems) {
                    if (form.id === item.id) {
                        newFormItem.push(item);
                    } else {
                        newFormItem.push(form);
                    }
                }
                return this.storage.set(POINTS_LIST_KEY, newFormItem);
            });
    }
    // Delete
    deleteItem(id: number): Promise<any> {
        return this.storage.get(POINTS_LIST_KEY)
            .then((formItems: Point[]) => {
                if (!formItems || formItems.length === 0) {
                    return null;
                }
                const formsToKeep: Point[] = [];
                for (const form of formItems) {
                    if (form.id !== id) {
                        formsToKeep.push(form);
                    }
                }
                return this.storage.set(POINTS_LIST_KEY, formsToKeep);
            });
    }
}
