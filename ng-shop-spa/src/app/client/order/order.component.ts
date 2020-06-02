import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderType = true;
  quantity = 1;
  constructor() { }

  ngOnInit(): void {
  }

  onItemChanged() {
    this.orderType = !this.orderType;
  }

  onIncreaseQuantity() {
    this.quantity--;
  }

  onDecreaseQuantity() {
    this.quantity++;
  }
}
