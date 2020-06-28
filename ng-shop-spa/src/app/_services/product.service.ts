import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + 'product/all');
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(this.baseUrl + 'product/' + id);
    }

    createProduct(product: any) {
        return this.http.post<Product>(this.baseUrl + 'product', product);
    }

    updateProduct(id: number, product: any) {
        return this.http.put(this.baseUrl + 'product/' + id, product);
    }

    deleteProduct(id: number) {
        return this.http.delete(this.baseUrl + 'product/' + id);
    }

    deleteImage(prodId: number, imgId: number) {
        return this.http.delete(this.baseUrl + 'product/' + prodId + '/images/' + imgId);
    }
}
