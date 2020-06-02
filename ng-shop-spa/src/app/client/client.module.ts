import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { NavbarComponent } from './_navbar/navbar.component';
import { FooterComponent } from './_footer/footer.component';
import { HomeComponent } from './home/home.component';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DetailComponent } from './detail/detail.component';
import { OrderComponent } from './order/order.component';


@NgModule({
  declarations: [
    ClientComponent,
    NavbarComponent,
    HomeComponent,
    DetailComponent,
    FooterComponent,
    OrderComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    CarouselModule,
    PaginationModule.forRoot()
  ]
})
export class ClientModule { }
