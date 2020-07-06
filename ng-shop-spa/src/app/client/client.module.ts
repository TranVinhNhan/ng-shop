import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { NavbarComponent } from './_navbar/navbar.component';
import { FooterComponent } from './_footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { OrderComponent } from './order/order.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailResolver } from '../_resolvers/product-detail.resolver';
import { UserAccountComponent } from './user-account/user-account.component';

@NgModule({
  declarations: [
    ClientComponent,
    NavbarComponent,
    HomeComponent,
    DetailComponent,
    FooterComponent,
    OrderComponent,
    RegisterComponent,
    LoginComponent,
    UserAccountComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    CarouselModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot()
  ],
  providers: [ProductDetailResolver]
})
export class ClientModule { }
