import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Order } from 'src/app/_models/order';
import { UserService } from 'src/app/_services/user.service';
import { Address } from 'src/app/_models/address';
import { OrderDetail } from 'src/app/_models/order-detail';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-export-invoice-modal',
  templateUrl: './export-invoice-modal.component.html',
  styleUrls: ['./export-invoice-modal.component.css']
})
export class ExportInvoiceModalComponent implements OnInit {

  title: string;
  order: Order;
  address: Address;
  now = new Date();

  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUserAddress();
  }

  loadUserAddress() {
    this.userService.getAddressOfUser(this.order.userId).subscribe((response: Address) => {
      this.address = response;
    }, error => console.log(error));
  }

  onTotal(cartItems: OrderDetail[]) {
    let sum = 0;
    cartItems.forEach(item => {
      sum += (item.pricePerUnit * item.quantity);
    });
    return sum;
  }
  onConfirm() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('l', 'cm', 'a4'); // Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save('invoice.pdf');
    });
  }
}
