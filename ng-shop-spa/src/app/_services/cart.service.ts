import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    baseUrl = environment.apiUrl;
    cartCount = new Subject<number>();

    constructor(private http: HttpClient) {
        this.cartCount.next(0);
    }

    updateCartCount(count?: number) {
        this.cartCount.next(count ? count : 0);
    }

    placeOrder(id: string, model: any) {
        if (id) {
            const headers = new HttpHeaders({ id });
            return this.http.post(this.baseUrl + 'order', model, { headers });
        } else {
            return this.http.post(this.baseUrl + 'order', model);
        }
    }
}
