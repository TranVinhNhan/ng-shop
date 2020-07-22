import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { Image } from 'src/app/_models/image';
import { CartService } from 'src/app/_services/cart.service';
import { CartItem } from 'src/app/_models/cart-item';
import { AlertifyService } from 'src/app/_services/alertifyjs.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {

  product: Product;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private alertifyService: AlertifyService
    ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.product = data.product);
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
          pricePerUnit: this.product.price,
          productShortName: this.product.productShortName
        };
        cart.push(cartItem); // thêm mới
        localStorage.setItem('cart', JSON.stringify(cart));

        this.cartService.cartCount.next(cart.length);
      }
    } else { // nếu chưa có giỏ hàng
      const cart = [];
      const cartItem: CartItem = {
        productId: this.product.id,
        productName: this.product.productName,
        thumbnailUrl: this.product.images.find(i => i.isThumbnail).url,
        quantity: 1,
        pricePerUnit: this.product.price,
        productShortName: this.product.productShortName
      };
      cart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(cart));

      this.cartService.cartCount.next(cart.length);
    }

    this.alertifyService.success('Cập nhật giỏ hàng thành công');
  }

  tragop() {
    this.alertifyService.message('Chức năng chưa được triển khai');
  }
}
