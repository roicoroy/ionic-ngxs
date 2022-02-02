import { Injectable, EventEmitter, Output } from '@angular/core';
// import { Plugins } from '@capacitor/app'
import { Keyboard } from '@capacitor/keyboard';
import { KeyboardInfo } from '@capacitor/keyboard';
// import { IKeyboardService } from '~/app/services/nativeInterfaces/IKeyboard';
import { Store } from '@ngxs/store';
import { IKeyboardService } from 'src/app/models/IKeyboard';
// import { UpdateKeyboardStatus } from '~/app/store/native/states/keyboard/keyboard.actions';

// const { Keyboard } = Plugins;

/** EquateMobile Keyboard service used to connect with native plugin. */
@Injectable({
    providedIn: 'root'
})
export class KeyboardService implements IKeyboardService {
    @Output() keyboardWillShow = new EventEmitter<KeyboardInfo>();

    @Output() keyboardDidShow = new EventEmitter<KeyboardInfo>();

    @Output() keyboardWillHide = new EventEmitter<void>();

    @Output() keyboardDidHide = new EventEmitter<void>();

    /** Creates a new Keyboard Service instance. */
    constructor(private readonly store: Store) {
        // Keyboard Plugin Events
        Keyboard.addListener('keyboardWillShow', (info: KeyboardInfo) => {
            this.keyboardWillShow.emit(info);
            // this.store.dispatch(new UpdateKeyboardStatus(true));
        });

        Keyboard.addListener('keyboardDidShow', (info: KeyboardInfo) => {
            this.keyboardDidShow.emit(info);
        });

        Keyboard.addListener('keyboardWillHide', () => {
            this.keyboardWillHide.emit();
            // this.store.dispatch(new UpdateKeyboardStatus(false));
        });

        Keyboard.addListener('keyboardDidHide', () => {
            this.keyboardDidHide.emit();
        });
    }

    /** Set whether the accessory bar should be visible on the keyboard. */
    async setAccessoryBarVisible(isBarVisible: boolean): Promise<void> {
        return Keyboard.setAccessoryBarVisible({ isVisible: isBarVisible });
    }

    /** Hide the keyboard. */
    async hideKeyboard(): Promise<void> {
        return Keyboard.hide();
    }

    /** Display the keyboard. */
    async showKeyboard(): Promise<void> {
        return Keyboard.show();
    }

    async setScroll(options: { isDisabled: boolean }): Promise<void> {
        return Keyboard.setScroll(options);
    }
}
