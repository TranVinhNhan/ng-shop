import { Product } from './product';

export interface Image {
    id: number;
    url: string;
    isMainImage: boolean;
    publicId: string;
    productId: number;

    product: Product;
}
