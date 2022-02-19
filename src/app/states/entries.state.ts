import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Entry, Point } from '../models';
import { EntriesService, IonStorageService, TEAM_ENTRY } from '../services';
import { Storage } from '@ionic/storage-angular';
import { EntryActions } from '../actions/entries.actions';

export class EntryStateModel {
    entries: Entry[];
    // entriesWaiter: Entry;
}
@State<EntryStateModel>({
    name: 'entries',
    defaults: {
        entries: [],
        // entriesWaiter: null
    }
})
@Injectable()
export class EntryState {
    constructor(
        private entriesService: EntriesService,
        private storage: Storage,
    ) {
    }
    @Selector()
    static getEntryList(state: EntryStateModel) {
        return state.entries;
    }
    @Action(EntryActions.GetEntries)
    getEntries({ getState, setState }: StateContext<EntryStateModel>) {
        return this.entriesService.getEntries()
            .then((result: Entry[]) => {
                if (result) {
                    const state = getState();
                    setState({
                        ...state,
                        entries: result,
                    });
                    return this.storage.set(TEAM_ENTRY, result);
                }
            });
    }
    @Action(EntryActions.AddEntry)
    addEntry({ getState, patchState }: StateContext<EntryStateModel>, { payload }: EntryActions.AddEntry) {
        const updateState = payload;
        return this.entriesService.addEntry(payload).then(() => {
            const state = getState();
            patchState({
                entries: [...state.entries, updateState]
            });
        });
    }
}

