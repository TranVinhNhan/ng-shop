import { Injectable } from '@angular/core';
declare let alertify: any;
@Injectable({
    providedIn: 'root'
})
export class AlertifyService {
    constructor() { }

    confirm(message: string, okCallback: () => any) {
        alertify.confirm(message, (e) => {
            if (e) {
                okCallback();
                console.log(e);
                console.log('hit callback');
            } else { }
        }).set({ title: 'Thông báo' });
    }

    success(message: string) {
        alertify.success(message);
    }

    error(message: string) {
        alertify.error(message);
    }

    warning(message: string) {
        alertify.warning(message);
    }

    message(message: string) {
        alertify.message(message);
    }
}
