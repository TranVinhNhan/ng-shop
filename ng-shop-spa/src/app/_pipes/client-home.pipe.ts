import { PipeTransform, Pipe } from '@angular/core';
import { Product } from '../_models/product';

@Pipe({
    name: 'productFilter'
})
export class ClientHomePipe implements PipeTransform {
    transform(value: Product[], filterString: string, brandNameArray: string[]) {
        if (value.length === 0) {
            return value;
        }

        if (brandNameArray.indexOf(filterString) > -1) {
            return value.filter(item => item.brand.brandName === filterString);
        }

        switch (filterString) {
            case '>25tr': return value.filter(item => item.price >= 25000000);
            case '>15tr': return value.filter(item => item.price >= 15000000 && item.price <= 25000000);
            case '>10tr': return value.filter(item => item.price >= 10000000 && item.price <= 15000000);
            case '>0tr': return value.filter(item => item.price <= 10000000);
            default: return value;
        }
    }

}

@Pipe({
    name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
    transform(value: Product[], filterString: string) {
        if (filterString) {
            return value.filter(item => item.productName.toLowerCase().includes(filterString));
        } else {
            return value;
        }
    }

}
