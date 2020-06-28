import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Brand } from '../_models/brand';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BrandService {

    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAllBrands(): Observable<Brand[]> {
        return this.http.get<Brand[]>(this.baseUrl + 'brand/all');
    }

    getBrandById(id: number): Observable<Brand> {
        return this.http.get<Brand>(this.baseUrl + 'brand/' + id);
    }

    createBrand(model: any) {
        return this.http.post(this.baseUrl + 'brand', model);
    }

    deleteBrand(id: number) {
        return this.http.delete(this.baseUrl + 'brand/' + id);
    }

    updateBrand(id: number, model: any) {
        return this.http.put(this.baseUrl + 'brand/' + id, model);
    }

    deleteImage(brandId: number, imgId: number) {
        return this.http.delete(this.baseUrl + 'brand/' + brandId + '/images/' + imgId);
    }
}
