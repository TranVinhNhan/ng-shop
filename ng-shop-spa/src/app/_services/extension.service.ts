import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ExtensionService {
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

    renderClass(orderStatus: string) {
        switch (orderStatus) {
            case 'Đã tiếp nhận':
                return 'px-2 inline-text bg-info text-white border border-info rounded';
            case 'Đang lấy hàng':
                return 'px-2 inline-text bg-primary text-white border border-primary rounded';
            case 'Đợi nhận hàng':
                return 'px-2 inline-text bg-warning text-black border border-warning rounded';
            case 'Đang vận chuyển':
                return 'px-2 inline-text bg-secondary text-white border border-secondary rounded';
            case 'Đơn hàng thành công':
                return 'px-2 inline-text bg-success text-white border border-success rounded';
            case 'Đã hủy đơn':
                return 'px-2 inline-text bg-danger text-white border border-danger rounded';
        }
    }
}
