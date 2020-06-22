import { Order } from './order';

export interface OrderDetail {
    id: number;
    productName: string;
    quantity: number;
    price: number;

    order: Order;
}
