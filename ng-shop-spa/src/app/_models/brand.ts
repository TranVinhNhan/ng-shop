import { Product } from './product';

export interface  Brand {
    id: number;
    brandName: string;

    products: Product[];
}
