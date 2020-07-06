import { User } from './user';
import { OrderDetail } from './order-detail';

export interface Order {
    id: number;
    placedTime: Date;
    fullName: string;
    isMale: boolean;
    phoneNumber: string;
    email: string;
    option: string;
    shippingAddress: string;
    shippingCity: string;
    shippingDistrict: string;
    orderStatus: string;
    isReceivedAtStore: boolean;
    storeAddress: string;

    userId?: number;
    orderDetails: OrderDetail[];
}
