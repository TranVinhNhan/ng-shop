import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Brand } from '../_models/brand';

@Injectable({
    providedIn: 'root'
})
export class BrandService {

    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAllBrands(): Observable<Brand[]> {
        return  this.http.get<Brand[]>(this.baseUrl + 'brand/all');
    }
}
