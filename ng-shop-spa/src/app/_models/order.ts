import { User } from './user';
import { OrderDetail } from './order-detail';

export interface Order {
    id: number;
    placedTime: Date;
    shippingAddress: string;
    shippingCity: string;
    shippingDistrict: string;
    orderStatus: string;

    user: User;
    orderDetails: OrderDetail[];
}
