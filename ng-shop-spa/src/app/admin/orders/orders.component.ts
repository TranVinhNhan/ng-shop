import { Component, OnInit, OnDestroy } from '@angular/core';

import { CartService } from 'src/app/_services/cart.service';
import { Order } from 'src/app/_models/order';
import { ExtensionService } from 'src/app/_services/extension.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductOrderModalComponent } from './product-order-modal/product-order-modal.component';
import { CartItem } from 'src/app/_models/cart-item';
import { OrderDetailModalComponent } from './order-detail-modal/order-detail-modal.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { ErrorTextService } from 'src/app/_services/error-text.service';
import { ExportInvoiceModalComponent } from './export-invoice-modal/export-invoice-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  orders: Order[];
  date = new Date();
  cartItems: CartItem[] = [];
  orderForm: FormGroup;
  isCollapsed = true;
  isFetching = false;
  isNewestFirst = true;
  errorMessage: string;
  errorMessageSubscription: Subscription;
  bsModalRef: BsModalRef;

  constructor(
    private cartService: CartService,
    private extensionService: ExtensionService,
    private modalService: BsModalService,
    private errorTextService: ErrorTextService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    this.loadErrorMessage();
    this.initOrderForm();
  }

  ngOnDestroy(): void {
    this.errorMessageSubscription.unsubscribe();
  }

  loadOrders() {
    this.isFetching = true;
    this.cartService.getAllOrder().subscribe((response: Order[]) => {
      this.orders = response;
      this.isFetching = false;
    }, error => {
      console.log(error);
    });
  }

  loadErrorMessage() {
    this.errorMessageSubscription = this.errorTextService.errorMessage.subscribe((errorMessage: string) => {
      this.errorMessage = errorMessage;
    });
  }

  initOrderForm() {
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

  onDeleteOrder(order: Order) {
    if (confirm('Bạn có chắc muốn xóa đơn hàng này? thao tác xóa sẽ không được phục hồi')) {
      this.cartService.deleteOrder(order.id).subscribe(() => {
        this.orders.splice(this.orders.indexOf(order), 1);
      }, error => {
        console.log(error);
      });
    }
  }

  onTotal(cartItems: CartItem[]) {
    let sum = 0;
    cartItems.forEach(item => {
      sum += (item.pricePerUnit * item.quantity);
    });
    return sum;
  }

  onValidate($event) {
    return this.extensionService.onValidate($event);
  }

  onShipping() {
    this.orderForm.controls.shippingCity.reset();
    this.orderForm.controls.shippingDistrict.reset();
    this.orderForm.controls.shippingAddress.reset();
  }

  onReceivedAtStore() {
    this.orderForm.patchValue({
      shippingCity: 'nhận tại cửa hàng',
      shippingDistrict: 'nhận tại cửa hàng',
      shippingAddress: 'nhận tại cửa hàng'
    });
  }

  onDeleteCartItem(cartItem: CartItem) {
    const index = this.cartItems.indexOf(cartItem);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  onChangeQuantity(cartItem: CartItem, qty: number) {
    const index = this.cartItems.indexOf(cartItem);
    if (index > -1) {
      this.cartItems[index].quantity += qty;
      if (this.cartItems[index].quantity === 0) {
        this.cartItems.splice(index, 1);
      }
    }
  }

  onOldestFirst() {
    this.isNewestFirst = !this.isNewestFirst;
  }

  onSubmit() {
    if (this.orderForm.valid && this.cartItems.length) {
      const order = Object.assign({}, this.orderForm.value);
      order.listOfOrderDetailDto = [];
      this.cartItems.forEach(item => {
        order.listOfOrderDetailDto.push({
          productId: item.productId,
          quantity: item.quantity,
          pricePerUnit: item.pricePerUnit,
          productShortName: item.productShortName
        });
      });

      this.cartService.placeOrder(null, order).subscribe((response: Order) => {
        this.orders.push(response);
        this.isCollapsed = true;
        this.orderForm.reset();
        this.orderForm.get('isMale').setValue(true);
        this.cartItems = [];
      }, error => {
        console.log(error);
      });
    }
  }

  openModalWithProductOrderComponent() {
    const initialState = {
      title: 'Chọn sản phẩm cho đơn hàng',
      cartItems: this.cartItems
    };
    this.bsModalRef = this.modalService.show(ProductOrderModalComponent, { initialState });
    this.bsModalRef.setClass('modal-lg');
  }

  openModalWithOrderDetailComponent(order: Order) {
    const initialState = {
      title: 'Chi tiết đơn hàng',
      order
    };
    this.bsModalRef = this.modalService.show(OrderDetailModalComponent, { initialState });
    this.bsModalRef.setClass('modal-lg');
  }

  openModalWithExportInvoiceComponent(order: Order) {
    const initialState = {
      title: 'Xuất hóa đơn',
      order
    };
    this.bsModalRef = this.modalService.show(ExportInvoiceModalComponent, { initialState });
    this.bsModalRef.setClass('modal-lg');
  }

  renderClass(orderStatus: string) {
    return this.extensionService.renderClass(orderStatus);
  }
}
