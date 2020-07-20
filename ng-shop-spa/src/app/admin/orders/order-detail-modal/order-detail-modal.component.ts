import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Order } from 'src/app/_models/order';
import { FormGroup, FormControl } from '@angular/forms';
import { CartService } from 'src/app/_services/cart.service';
import { CartItem } from 'src/app/_models/cart-item';

@Component({
  selector: 'app-order-detail-modal',
  templateUrl: './order-detail-modal.component.html',
  styleUrls: ['./order-detail-modal.component.css']
})
export class OrderDetailModalComponent implements OnInit {

  title: string;
  order: Order;
  orderDetailForm: FormGroup;
  constructor(public bsModalRef: BsModalRef, private cartService: CartService) { }

  ngOnInit(): void {
    this.initOrderDetailForm();
  }

  initOrderDetailForm() {
    this.orderDetailForm = new FormGroup({
      fullName: new FormControl({ value: this.order.fullName, disabled: true }),
      phoneNumber: new FormControl({ value: this.order.phoneNumber, disabled: true }),
      isMale: new FormControl({ value: this.order.isMale, disabled: true }),
      email: new FormControl({ value: this.order.email, disabled: true }),
      shipping: new FormControl(
        { value: this.order.shippingAddress + ' ' + this.order.shippingDistrict + ' ' + this.order.shippingCity, disabled: true }),
      option: new FormControl({ value: this.order.option, disabled: true }),
      orderStatus: new FormControl(this.order.orderStatus)
    });

    if (this.order.isReceivedAtStore) {
      this.orderDetailForm.get('shipping').setValue('Khách yêu cầu nhận sản phẩm tại cửa hàng');
    }
  }

  onSubmit() {
    if (this.orderDetailForm.untouched) {
      this.bsModalRef.hide();
    } else {
      this.cartService.updateOrderStatus(this.order.id, this.orderDetailForm.value).subscribe(() => {
        this.bsModalRef.hide();
        this.order.orderStatus = this.orderDetailForm.get('orderStatus').value;
      }, error => {
        console.log(error);
      });
    }
  }

  onTotal(orderDetails) {
    let sum = 0;
    orderDetails.forEach(item => {
      sum += (item.pricePerUnit * item.quantity);
    });
    return sum;
  }
}
