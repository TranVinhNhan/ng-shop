import { Product } from './product';
import { Image } from './image';

export interface Brand {
    id: number;
    brandName: string;

    products: Product[];
    image: Image;
}
