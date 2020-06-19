import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileUploadModule } from 'ng2-file-upload';
import { ChartsModule } from 'ng2-charts';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from './_navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './_sidebar/sidebar.component';
import { ProductsComponent } from './products/products.component';
import { ProductModalComponent } from './products/product-modal/product-modal.component';


@NgModule({
  declarations: [
    AdminComponent,
    NavbarComponent,
    DashboardComponent,
    SidebarComponent,
    ProductsComponent, ProductModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    FileUploadModule,
    ChartsModule
  ]
})
export class AdminModule { }
