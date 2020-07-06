import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NumberOnlyService {
    constructor() { }

    // https://stackoverflow.com/questions/45418242/how-to-allow-only-numbers-in-html-input-type-text-using-typescript
    onValidate($event) {
        const regex: RegExp = new RegExp(/^[0-9]{1,}$/g);
        const specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft'];
        if (specialKeys.indexOf($event.key) !== -1) {
            return;
        } else {
            if (regex.test($event.key)) {
                return true;
            } else {
                return false;
            }
        }
    }
}
