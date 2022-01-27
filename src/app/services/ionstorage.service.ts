/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, from,} from 'rxjs';

const TEAM_ENTRY = 'teamEntry';
const WAITERS_NAME = 'waitersName';

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
    const storage = await this.storage.create();
  }
  getFromPromise(key) {
    return this.storage.get(key).then((data) => data,
      error => console.error(error));
  }
  getKeyAsObservable(key): Observable<any> {
    return from(this.getFromPromise(key));
  }
}
