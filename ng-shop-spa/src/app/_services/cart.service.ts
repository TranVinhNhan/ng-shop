import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Order } from '../_models/order';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    baseUrl = environment.apiUrl;
    cartCount = new BehaviorSubject<number>(0);

    constructor(private http: HttpClient) { }

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

    getAllOrder(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + 'order/all');
    }

    getAllOrdersByUser(id: number): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + 'order/user/' + id);
    }

    deleteOrder(id: number) {
        return this.http.delete(this.baseUrl + 'order/' + id);
    }
}
