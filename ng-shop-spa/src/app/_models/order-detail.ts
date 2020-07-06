import { Order } from './order';
import { Product } from './product';

export interface OrderDetail {
    id: number;
    productShortName: string;
    quantity: number;
    price: number;

    orderId: number;
    productId: number;
}
