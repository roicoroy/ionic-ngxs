/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IonStorageService } from '.';
import { Point } from '../models/point.type';
import * as nanoid from 'nanoid';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
// import { Points } from '../types/points.type';
export const POINTS_LIST_KEY = 'pointsList';

@Injectable({
    providedIn: 'root'
})
export class PointsService {
    public pointsListSubject: BehaviorSubject<Point[]> = new BehaviorSubject<Point[]>([]);
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
    // : Observable<any>
    fetchPoints(){
        // this.ionStorageService.getKeyAsObservable(POINTS_LIST_KEY).subscribe((pointsList) => {
        //     if (!pointsList) {
        //     }
        // });
        // return of(this.getPointsList());
        // return this.http.get<Point[]>(`${this.baseUrl}/points`).pipe(tap((apiResult) => {
        //     console.log(apiResult);
        //     if (!apiResult) {

        //     }
        //     else {
        //         this.storage.set(POINTS_LIST_KEY, apiResult);
        //     }
        // }));
        return this.http.get<Point[]>(`${this.baseUrl}/points`);
    }
    deletePoint(id: number) {
        // this.deleteItem(id);
        return this.http.delete(`${this.baseUrl}/points/${id}`); // .subscribe((res)=> console.log(res));
    }
    addPoint(payload: Point) {
        payload.id = nanoid(12);
        // this.addItem(payload);
        return this.http.post<Point>(`${this.baseUrl}/points`, payload);
    }
    updatePoint(payload: Point, id: number) {
        // this.updateItem(payload);
        return this.http.put<Point>(`${this.baseUrl}/points/${id}`, payload);
    }
    // Add on Storage
    addItem(item: Point): Promise<any> {
        // Specify a the return of a promess to use then block get the item was added
        return this.storage.get(POINTS_LIST_KEY)
            .then((resWaiters: Point[]) => {
                // Check if exist push it or return set ;
                if (resWaiters) {
                    resWaiters.push(item);
                    return this.storage.set(POINTS_LIST_KEY, resWaiters); // Return array with added form
                } else {
                    return this.storage.set(POINTS_LIST_KEY, [item]); // Return the same array
                }
            });
    }
    // Update
    updateItem(item: Point): Promise<any> {
        return this.storage.get(POINTS_LIST_KEY)
            .then((formItems: Point[]) => {
                // If items does not exist or length is 0 return null
                if (!formItems || formItems.length === 0) {
                    return null;
                }
                const newFormItem: Point[] = [];

                // Loop througth the array and check if exist the added item
                for (const form of formItems) {
                    if (form.id === item.id) {
                        newFormItem.push(item); // Push newItem
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
