import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { CartItem } from 'src/app/_models/cart-item';

@Component({
  selector: 'app-product-order-modal',
  templateUrl: './product-order-modal.component.html',
  styleUrls: ['./product-order-modal.component.css']
})
export class ProductOrderModalComponent implements OnInit {

  title: string;
  listProducts: Product[];

  cartItems: CartItem[] = [];
  temp: CartItem[] = [];
  constructor(public bsModalRef: BsModalRef, private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((response: Product[]) => {
      this.listProducts = response;
    }, error => {
      console.log(error);
    });
  }

  onChecked(product: Product) {
    const test: CartItem = {
      productId: product.id,
      productName: product.productName,
      productShortName: product.productShortName,
      thumbnailUrl: product.images[0].url,
      quantity: 1,
      pricePerUnit: product.price
    };

    this.temp.push(test);
  }

  onConfirm() {
    this.temp.forEach(item => {
      this.cartItems.push(item);
    });
    this.bsModalRef.hide();
  }
}
