import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { WaiterActions } from '../actions/waiter.action';
// import { Waiter } from '../models/Waiter';
import { IonStorageService } from '../services';
import { Storage } from '@ionic/storage-angular';
import { Waiter } from '../models/waiters.type';
import * as nanoid from 'nanoid';
import { Point } from '../models/point.type';

export const WAITERS_LIST_KEY = 'waitersList';
export class WaiterStateModel {
    waitersList: Waiter[];
    // selectedWaiter: Waiter;
}
@State<WaiterStateModel>({
    name: 'waiter',
    defaults: {
        waitersList: [],
        // selectedWaiter: null
    }
})
@Injectable()
export class WaiterState {
    private waitersList: Waiter[] = [
        new Waiter({
            id: 0,
            name: 'Jose',
            hours: 1.25,
        }),
        new Waiter({
            id: 1,
            name: 'Mary',
            hours: 4.50,
        }),
        new Waiter({
            id: 2,
            name: 'Joe',
            hours: 4.50,
            points: [
                new Point({ id: 0, label: 'Speak English', value: 0.5, type: 'checkbox' }),
                new Point({ id: 1, label: 'Answer Phone', value: 0.5, type: 'checkbox' }),
            ],
        }),
    ];
    constructor(
        // private waiterService: WaitersService,
        private storage: Storage,
        private ionStorageService: IonStorageService,
    ) {
    }
    @Selector()
    static getWaiterList(state: WaiterStateModel) {
        console.log(state);

        return state.waitersList;
    }
    @Action(WaiterActions.Get)
    getWaiter({ getState, setState }: StateContext<WaiterStateModel>) {
        return this.ionStorageService.getKeyAsObservable(WAITERS_LIST_KEY).pipe(tap((waitersListResponse) => {
            if (!waitersListResponse) {
                this.storage.set(WAITERS_LIST_KEY, this.waitersList).then((result) => {
                    const state = getState();
                    setState({
                        ...state,
                        waitersList: result,
                    });
                });
            } else {
                const state = getState();
                setState({
                    ...state,
                    waitersList: waitersListResponse,
                });
            }
        }));
    }
    @Action(WaiterActions.Add)
    addWaiter({ getState, patchState }: StateContext<WaiterStateModel>, { payload }: WaiterActions.Add) {
        const waiter = new Waiter({
            id: nanoid(12),
            name: payload.name,
        });
        // payload.id = nanoid(12);
        const result = waiter;
        this.addItem(result).then(() => {
            const state = getState();
            patchState({
                waitersList: [...state.waitersList, result]
            });
        });
    }

    @Action(WaiterActions.Delete)
    deleteWaiter({ getState, setState }: StateContext<WaiterStateModel>, { id }: WaiterActions.Delete) {
        this.deleteItem(id).then(() => {
            const state = getState();
            const filteredArray = state.waitersList.filter((item) => item.id !== id);
            setState({
                ...state,
                waitersList: filteredArray,
            });
        });
    }

    // Add on Storage
    addItem(item: Waiter): Promise<any> {
        console.log(item);
        item.id = nanoid(12);
        return this.storage.get(WAITERS_LIST_KEY)
            .then((resWaiters: Waiter[]) => {
                console.log(resWaiters);
                if (resWaiters) {
                    resWaiters.push(item);
                    return this.storage.set(WAITERS_LIST_KEY, resWaiters);
                } else {
                    return this.storage.set(WAITERS_LIST_KEY, [item]);
                }
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
