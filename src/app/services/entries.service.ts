import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as nanoid from 'nanoid';
import { IonStorageService } from '.';
// import { TEAM_ENTRY } from '../calculator-ngxs/calculator-ngxs.page';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  constructor(
    private storage: Storage,
    private ionStorageService: IonStorageService,
  ) { }

  // ngOnInit() {
  //   this.sub = this.ionStorageService.getKeyAsObservable(TEAM_ENTRY).subscribe((entries) => {
  //     this.data = entries;
  //     console.log(this.data);
  //   });
  // }
deleteAll(){
  this.storage.remove('teamEntry');
}
  addEntry(item: any): Promise<any[]> {
    item.id = nanoid(12);
    console.log(item);
    return this.storage.get('teamEntry')
      .then((formItems: any[]) => {
        console.log(formItems);
        if (formItems) {
          formItems.push(item);
          return this.storage.set('teamEntry', formItems);
        } else {
          return this.storage.set('teamEntry', [item]);
        }
      });
  }
  deleteEntry(id: number): Promise<any> {
    return this.storage.get('teamEntry')
      .then((formItems: any[]) => {
        if (!formItems || formItems.length === 0) {
          return null;
        }
        const formsToKeep: any[] = [];
        for (const form of formItems) {
          if (form.id !== id) {
            formsToKeep.push(form);
          }
        }
        return this.storage.set('teamEntry', formsToKeep);
      });
  }
}
