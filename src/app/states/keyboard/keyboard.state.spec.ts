import { Store, NgxsModule, Actions } from "@ngxs/store";
import { TestBed, async } from '@angular/core/testing';
import { KeyboardState } from './keyboard.state';
import { UpdateKeyboardStatus } from './keyboard.actions';

describe('Keyboard store', () => {
    let store: Store;
    let actions$: Actions;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([KeyboardState])]
      }).compileComponents();

      store = TestBed.get(Store);
      actions$ = TestBed.get(Actions);
    }));

    it('When keyboard appears, state should be updated accordingly', async () => {
        await store.dispatch(new UpdateKeyboardStatus(true)).toPromise();

        const result = store.selectSnapshot(KeyboardState.getState);
        expect(result.isOpen).toBe(true);
    });

    it('When keyboard disappears, state should be updated accordingly', async () => {
        await store.dispatch(new UpdateKeyboardStatus(false)).toPromise();

        const result = store.selectSnapshot(KeyboardState.getState);
        expect(result.isOpen).toBe(false);
    });
  });
  