import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
