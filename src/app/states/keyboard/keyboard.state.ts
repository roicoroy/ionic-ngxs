import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';
import { UpdateKeyboardStatus } from './keyboard.actions';

/** Interface for keyboard state */
export interface IKeyboardStateModel {
    /** Keyboard is open, if it's true. */
    isOpen: boolean;
}

@State<IKeyboardStateModel>({
    name: 'keyboard',
    defaults: {
        isOpen: false
    }
})
@Injectable()
export class KeyboardState {

    constructor(public store: Store) {
    }

    @Selector()
    public static getState(state: IKeyboardStateModel): IKeyboardStateModel {
        return state;
    }

    @Selector()
    public static isOpen(state: IKeyboardStateModel): boolean {
        return state.isOpen;
    }

    @Action(UpdateKeyboardStatus)
    public updateKeyboardStatus(ctx: StateContext<IKeyboardStateModel>, action: UpdateKeyboardStatus): void {
        ctx.patchState({ isOpen: action.isOpen });
    }
}
