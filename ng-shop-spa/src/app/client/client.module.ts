import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { NavbarComponent } from './_navbar/navbar.component';
import { HomeComponent } from './home/home.component';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FooterComponent } from './_footer/footer.component';


@NgModule({
  declarations: [ClientComponent, NavbarComponent, HomeComponent, FooterComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    CarouselModule
  ]
})
export class ClientModule { }
