/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IonStorageService } from '.';
import { Point } from '../models/point.type';
import * as nanoid from 'nanoid';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
    fetchPoints(){
        return this.http.get<Point[]>(`${this.baseUrl}/points`);
    }
    deletePoint(id: number) {
        return this.http.delete(`${this.baseUrl}/points/${id}`);
    }
    addPoint(payload: Point) {
        payload.id = nanoid(12);
        return this.http.post<Point>(`${this.baseUrl}/points`, payload);
    }
    updatePoint(payload: Point, id: number) {
        return this.http.put<Point>(`${this.baseUrl}/points/${id}`, payload);
    }
}
