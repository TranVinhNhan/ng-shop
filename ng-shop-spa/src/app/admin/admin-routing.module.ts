import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { BrandsComponent } from './brands/brands.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent ,
    children: [
      { path: '', component: DashboardComponent},
      { path: 'products', component: ProductsComponent},
      { path: 'customers', component: CustomersComponent},
      { path: 'orders', component: OrdersComponent},
      { path: 'brands', component: BrandsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
