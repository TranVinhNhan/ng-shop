import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + 'user/all');
    }

    updateUser(model: any, id: number) {
        return this.http.put(this.baseUrl + 'user/' + id, model);
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(this.baseUrl + 'user/' + id);
    }

    // headers nhận tên biến để set key:value pair, ví dụ:
    getPersonalInfo(id: string): Observable<User> {
        const headers = new HttpHeaders({ id }); // id: 1
        return this.http.get<User>(this.baseUrl + 'user', { headers });
    }

    // nếu không dùng cách trên, có thể đặt tên key và gán value như bth, ví dụ: {'UID': id}
    updatePersonalInfo(id: string, model: any) {
        const headers = new HttpHeaders({ id });
        return this.http.put(this.baseUrl + 'user', model, { headers });
    }

    cancelOrder(userid: string, orderId: number, order: { orderStatus: string }) {
        const headers = new HttpHeaders({ id: userid });
        return this.http.put(this.baseUrl + 'order/cancel/' + orderId, order, { headers });
    }
}
