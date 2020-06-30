import { Component, OnInit } from '@angular/core';
import { CartItem } from '../detail/detail.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  cart: CartItem[];
  orderType = true;
  orderForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.loadCart();
    this.initOrderForm();
  }

  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  initOrderForm() {
    this.orderForm = new FormGroup({
      isMale: new FormControl(true),
      fullname: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      option: new FormControl(''),
      isReceivedAtStore: new FormControl(false),
      shippingCity: new FormControl('', Validators.required),
      shippingDistrict: new FormControl('', Validators.required),
      shippingAddress: new FormControl('', Validators.required)
    });
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
      this.loadCart();
    }
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
      this.loadCart();
    }
  }

  onTotal() {
    let sum = 0;
    this.cart.forEach((cartItem: CartItem) => {
      sum += (cartItem.pricePerUnit * cartItem.quantity);
    });
    return sum;
  }

  onSubmit() {
    console.log(this.orderForm.value);
  }
}
