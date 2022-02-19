import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { WaiterActions } from '../actions/waiter.action';
// import { Waiter } from '../models/Waiter';
import { IonStorageService } from '../services';
import { Storage } from '@ionic/storage-angular';
import { Waiter } from '../models/waiters.type';
import { WaitersService } from '../services/waiters.service';

export const WAITERS_LIST_KEY = 'waitersList';
export class WaiterStateModel {
    waiters: Waiter[];
    selectedWaiter: Waiter;
}
@State<WaiterStateModel>({
    name: 'waiter',
    defaults: {
        waiters: [],
        selectedWaiter: null
    }
})
@Injectable()
export class WaiterState {
    constructor(
        private waiterService: WaitersService,
        private storage: Storage,
        private ionStorageService: IonStorageService,
    ) {
    }
    @Selector()
    static getWaiterList(state: WaiterStateModel) {
        return state.waiters;
    }
    @Selector()
    static getSelectedWaiter(state: WaiterStateModel) {
        return state.selectedWaiter;
    }
    @Action(WaiterActions.Get)
    getWaiter({ getState, setState }: StateContext<WaiterStateModel>) {
        return this.waiterService.getItems()
            .then((result: Waiter[]) => {
                if (result) {
                    const state = getState();
                    setState({
                        ...state,
                        waiters: result,
                    });
                    return this.storage.set(WAITERS_LIST_KEY, result);
                }
            });
    }
    @Action(WaiterActions.Add)
    addWaiter({ getState, patchState }: StateContext<WaiterStateModel>, { payload }: WaiterActions.Add) {
        const updateState = payload;
        return this.waiterService.addItem(payload).then(() => {
            const state = getState();
            patchState({
                waiters: [...state.waiters, updateState]
            });
        });
    }
    @Action(WaiterActions.Update)
    updateWaiter(ctx: StateContext<WaiterStateModel>, { payload, id }: WaiterActions.Update) {
        return this.waiterService.updateItem(payload).then(() => {
            const state = ctx.getState();
            const waitersList = [...state.waiters];
            const todoIndex = waitersList.findIndex((item) => item.id === id);
            waitersList[todoIndex] = payload;
            ctx.setState({
                ...state,
                waiters: waitersList,
            });
        });
    }
    @Action(WaiterActions.UpdateWaiterPoints)
    updateWaiterPoints(ctx: StateContext<WaiterStateModel>, { payload, id }: WaiterActions.Update) {
        return this.waiterService.updateWaiterPoint(payload).then(() => {

        });
    }
    @Action(WaiterActions.Delete)
    deleteWaiter({ getState, setState }: StateContext<WaiterStateModel>, { id }: WaiterActions.Delete) {
        return this.waiterService.deleteItem(id).then(() => {
            const state = getState();
            const filteredArray = state.waiters.filter((item) => item.id !== id);
            setState({
                ...state,
                waiters: filteredArray,
            });
        });
    }
    @Action(WaiterActions.SetSelected)
    setSelectedWaiterId({ getState, setState }: StateContext<any>, { payload }: WaiterActions.SetSelected) {
        const state = getState();
        setState({
            ...state,
            selectedWaiter: payload
        });
    }
}
