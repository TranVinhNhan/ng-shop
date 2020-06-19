import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { Image } from 'src/app/_models/image';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productsArray: Product[] = [];
  onePageArray: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadAllProducts();
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.onePageArray = this.productsArray.slice(startItem, endItem);
  }

  private loadAllProducts() {
    this.productService
      .getAllProducts()
      .subscribe((products: Product[]) => {
        this.productsArray = products;
        this.onePageArray = this.productsArray.slice(0, 10);
      }, error => {
        console.log(error);
      });
  }
}
