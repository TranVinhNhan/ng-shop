import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { Image } from 'src/app/_models/image';


export interface CartItem {
  productId: number;
  productName: string;
  thumbnailUrl: string;
  quantity: number;
  pricePerUnit: number;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {

  product: Product;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.product = data.product);
    console.log(this.route.snapshot.params.id);
  }

  loadAlbum(images: Image[]): Image[] {
    return images.filter(i => !i.isThumbnail);
  }

  addToCart() {
    // nếu đã có sản phẩm trong giỏ hàng
    if (localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      const cartItemSelected = cart.find((i: CartItem) => i.productId === this.product.id);
      if (cartItemSelected) { // nếu sản phẩm trong giỏ hàng trùng với sản phẩm vừa mua thêm
        cartItemSelected.quantity++; // tăng qty
        localStorage.setItem('cart', JSON.stringify(cart));
      } else { // nếu không trùng sản phẩm trong giỏ hàng
        const cartItem: CartItem = {
          productId: this.product.id,
          productName: this.product.productName,
          thumbnailUrl: this.product.images.find(i => i.isThumbnail).url,
          quantity: 1,
          pricePerUnit: this.product.price
        };
        cart.push(cartItem); // thêm mới
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    } else { // nếu chưa có giỏ hàng
      const cart = [];
      const cartItem: CartItem = {
        productId: this.product.id,
        productName: this.product.productName,
        thumbnailUrl: this.product.images.find(i => i.isThumbnail).url,
        quantity: 1,
        pricePerUnit: this.product.price
      };
      cart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
}
