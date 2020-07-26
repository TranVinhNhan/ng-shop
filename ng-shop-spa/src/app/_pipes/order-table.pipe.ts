import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../_models/order';

@Pipe({
    name: 'placedTime'
})

export class PlacedTimePipe implements PipeTransform {
    transform(value: Order[], isNewestFirst: boolean) {
        if (isNewestFirst) {
            return value.sort((a, b) => {
                return +new Date(b.placedTime) - +new Date(a.placedTime);
            });
        } else {
            return value.sort((a, b) => {
                return +new Date(a.placedTime) - +new Date(b.placedTime);
            });
        }

    }
}
