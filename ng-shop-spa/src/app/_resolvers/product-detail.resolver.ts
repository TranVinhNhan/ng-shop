import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Product } from '../_models/product';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductService } from '../_services/product.service';

@Injectable({
    providedIn: 'root'
})
export class ProductDetailResolver implements Resolve<Product> {

    constructor(private productService: ProductService, private router: Router) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Product | Observable<Product> | Promise<Product> {
        return this.productService.getProductById(+route.params.id).pipe(
            catchError(error => {
                console.log(error);
                this.router.navigate(['']);
                return of(null);
            })
        );
    }

}
