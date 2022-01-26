import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as nanoid from 'nanoid';
import { Waiter } from './models/Waiter';

@Injectable({
    providedIn: 'root'
})

export class WaiterService {
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.API_URL;
    }
    fetchWaiters() {
        return this.http.get<Waiter[]>(`${this.baseUrl}/waiters`);
    }

    deleteWaiter(id: number) {
        return this.http.delete(`${this.baseUrl}/waiters/${id}`);
    }

    addWaiter(payload: Waiter) {
        payload.id = nanoid(12);
        return this.http.post<Waiter>(`${this.baseUrl}/waiters`, payload);
    }

    updateWaiter(payload: Waiter, id: number) {
        return this.http.put<Waiter>(`${this.baseUrl}/waiters/${id}`, payload);
    }
}
