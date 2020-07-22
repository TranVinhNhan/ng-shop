import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from 'src/app/_models/image';

@Injectable({
    providedIn: 'root'
})
export class BannerService {

    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAllBanners(): Observable<Image[]> {
        return this.http.get<Image[]>(this.baseUrl + 'banner');
    }

    deleteBanner(id: number) {
        return this.http.delete(this.baseUrl + 'banner/' + id);
    }
}
