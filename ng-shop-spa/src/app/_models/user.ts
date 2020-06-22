import { Order } from './order';

export interface User {
    id: number;
    email: string;
    role: string;
    fullName: string;
    isMale: boolean;
    phoneNumber: string;

    orders: Order[];
}
