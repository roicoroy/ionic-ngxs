import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { WaiterActions } from '../actions/waiter.action';
import { Waiter } from '../models/Waiter';
import { WaiterService } from '../waiter.service';

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
    constructor(private waiterService: WaiterService) {
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
        return this.waiterService.fetchWaiters()
            .pipe(tap((result) => {
                const state = getState();
                setState({
                    ...state,
                    waiters: result,
                });
            }));
    }
    @Action(WaiterActions.Add)
    addWaiter({ getState, patchState }: StateContext<WaiterStateModel>, { payload }: WaiterActions.Add) {
        return this.waiterService.addWaiter(payload)
            .pipe(tap((result) => {
                const state = getState();
                patchState({
                    waiters: [...state.waiters, result]
                });
            }));
    }
    @Action(WaiterActions.Update)
    updateWaiter(ctx: StateContext<WaiterStateModel>, { payload, id }: WaiterActions.Update) {
        return this.waiterService.updateWaiter(payload, id)
            .pipe(
                tap((result) => {
                    console.log(result);
                    const state = ctx.getState();
                    const waitersList = [...state.waiters];
                    const todoIndex = waitersList.findIndex((item) => item.id === id);
                    waitersList[todoIndex] = result;
                    ctx.setState({
                        ...state,
                        waiters: waitersList,
                    });
                })
            );
    }


    @Action(WaiterActions.Delete)
    deleteWaiter({ getState, setState }: StateContext<WaiterStateModel>, { id }: WaiterActions.Delete) {
        return this.waiterService.deleteWaiter(id)
            .pipe(tap(() => {
                const state = getState();
                const filteredArray = state.waiters.filter((item) => item.id !== id);
                setState({
                    ...state,
                    waiters: filteredArray,
                });
            }));
    }

    @Action(WaiterActions.SetSelected)
    setSelectedWaiterId({ getState, setState }: StateContext<WaiterStateModel>, { payload }: WaiterActions.SetSelected) {
        const state = getState();
        setState({
            ...state,
            selectedWaiter: payload
        });
    }
}
