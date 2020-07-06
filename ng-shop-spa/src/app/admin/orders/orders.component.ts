import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/_services/cart.service';
import { Order } from 'src/app/_models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  date = new Date();
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.cartService.getAllOrder().subscribe((response: Order[]) => {
      this.orders = response;
    }, error => {
      console.log(error);
    });
  }
}
