import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fullArray: { name: string, price: number, description: string }[] = [];
  onePageArray: { name: string, price: number, description: string }[] = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 30; i++) {
      this.fullArray.push(
        {
          name: 'Razer Blade 15 ver1.' + i,
          price: 39990000,
          description: 'DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription'
        }
      );
    }

    this.onePageArray = this.fullArray.slice(0, 10);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.onePageArray = this.fullArray.slice(startItem, endItem);
  }
}
