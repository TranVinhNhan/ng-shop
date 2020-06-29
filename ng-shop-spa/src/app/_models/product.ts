import { Brand } from './brand';
import { Image } from './image';

export interface  Product {
    id: number;
    productName: string;
    productShortName: string;
    description: string;
    shortDescription: string;
    processor: string;
    memory: string;
    storage: string;
    display: string;
    graphics: string;
    chargingAndExpansion: string;
    size: string;
    weight: string;
    operatingSystem: string;
    price: number;
    isAvailable: boolean;

    brand: Brand;
    images: Image[];
}
