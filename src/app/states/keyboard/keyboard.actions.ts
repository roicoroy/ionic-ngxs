/**
 * UpdateKeyboardStatus state management action.
 */
export class UpdateKeyboardStatus {
    /** [Keyboard] Update keyboard status */
    public static readonly type = '[Keyboard] Update Keyboard Status';
    constructor(public isOpen: boolean) { }
}
