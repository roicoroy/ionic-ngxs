import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, from,} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IonStorageService {
  constructor(
    private storage: Storage,
  ) {
    this.init();
  }
  async init() {
    return await this.storage.create();
  }
  getFromPromise(key) {
    return this.storage.get(key).then((data) => data,
      error => console.error(error));
  }
  getKeyAsObservable(key): Observable<any> {
    return from(this.getFromPromise(key));
  }
}
