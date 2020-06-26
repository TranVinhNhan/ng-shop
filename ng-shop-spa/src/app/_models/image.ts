import { Product } from './product';

export interface Image {
    id: number;
    url: string;
    isThumbnail: boolean;
    publicId: string;
    productId: number;

    product: Product;
}
