import { Product } from './product';
import { Brand } from './brand';

export interface Image {
    id: number;
    url: string;
    isThumbnail: boolean;
    isBanner: boolean;
    publicId: string;
    productId: number;
    brandID: number;

    product: Product;
    brand: Brand;
}
