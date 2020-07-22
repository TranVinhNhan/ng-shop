import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CartService } from 'src/app/_services/cart.service';
import { ExtensionService } from 'src/app/_services/extension.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { Order } from 'src/app/_models/order';
import { CartItem } from 'src/app/_models/cart-item';
import { AlertifyService } from 'src/app/_services/alertifyjs.service';

@Component({
  selector: 'app-cart',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  cart: CartItem[];
  id: number;
  orderSuccessful = false;
  orderForm: FormGroup;
  constructor(
    private cartService: CartService,
    private extensionService: ExtensionService,
    private authService: AuthService,
    private userService: UserService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit(): void {
    this.loadCart();
    this.initOrderForm();
    this.loadUserInfo();
  }

  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.cartService.updateCartCount(this.cart ? this.cart.length : 0);
  }

  initOrderForm() {
    // const userInfo = this.preloadUserInfo();
    this.orderForm = new FormGroup({
      isMale: new FormControl(true),
      fullName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      option: new FormControl(''),
      isReceivedAtStore: new FormControl(false),
      shippingCity: new FormControl('', Validators.required),
      shippingDistrict: new FormControl('', Validators.required),
      shippingAddress: new FormControl('', Validators.required)
    });
  }

  loadUserInfo() {
    if (this.authService.isAuthenticated()) {
      this.userService.getPersonalInfo(this.authService.decodedToken.nameid).subscribe((response: User) => {
        this.orderForm = new FormGroup({
          isMale: new FormControl(response.isMale),
          fullName: new FormControl(response.fullName, Validators.required),
          phoneNumber: new FormControl(response.phoneNumber, Validators.required),
          email: new FormControl(response.email, [Validators.email, Validators.required]),
          option: new FormControl(),
          isReceivedAtStore: new FormControl(false),
          shippingCity: new FormControl(response.city, Validators.required),
          shippingDistrict: new FormControl(response.district, Validators.required),
          shippingAddress: new FormControl(response.addressNumber, Validators.required)
        });
      });
    }
  }

  // https://stackoverflow.com/questions/45418242/how-to-allow-only-numbers-in-html-input-type-text-using-typescript
  onValidate($event) {
    return this.extensionService.onValidate($event);
  }


  onReceivedAtStore() {
    this.orderForm.patchValue({
      shippingCity: 'nhận tại cửa hàng',
      shippingDistrict: 'nhận tại cửa hàng',
      shippingAddress: 'nhận tại cửa hàng'
    });
  }

  onShipping() {
    this.orderForm.controls.shippingCity.reset();
    this.orderForm.controls.shippingDistrict.reset();
    this.orderForm.controls.shippingAddress.reset();
  }

  onDeleteCartItem(cartItem: CartItem) {
    if (this.cart.length > 0) {
      this.cart.splice(this.cart.indexOf(cartItem), 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    if (this.cart.length === 0) {
      localStorage.removeItem('cart');
    }
    this.loadCart();
  }

  onChangeQuantity(cartItem: CartItem, qty: number) {
    const index = this.cart.indexOf(cartItem, 0);
    this.cart[index].quantity += qty;
    if (this.cart[index].quantity === 0) {
      this.cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    if (this.cart.length === 0) {
      localStorage.removeItem('cart');
    }
    this.loadCart();
  }

  onTotal() {
    let sum = 0;
    this.cart.forEach((cartItem: CartItem) => {
      sum += (cartItem.pricePerUnit * cartItem.quantity);
    });
    return sum;
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const order = Object.assign({}, this.orderForm.value);
      const currentCart = JSON.parse(localStorage.getItem('cart'));
      const cartItems = [];
      currentCart.forEach(item => {
        cartItems.push(
          {
            productId: item.productId,
            quantity: item.quantity,
            pricePerUnit: item.pricePerUnit,
            productShortName: item.productShortName
          }
        );
      });
      order.listOfOrderDetailDto = cartItems;

      this.cartService.placeOrder(this.authService.decodedToken?.nameid, order).subscribe((response: Order) => {
        this.orderSuccessful = true;
        this.id = response.id;
        localStorage.removeItem('cart');
        this.loadCart();
        console.log(response);
      }, error => {
        console.log(error);
      });
    }
  }

  chuyenkhoanOnline() {
    this.alertifyService.message('Chức năng chưa được triển khai');
  }
}
