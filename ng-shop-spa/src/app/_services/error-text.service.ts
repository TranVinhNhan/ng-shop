import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorTextService {

    errorMessage = new BehaviorSubject<string>(null);

    constructor() { }

    setErrorMessage(message: string) {
        this.errorMessage.next(message ? message : null);
    }
}
