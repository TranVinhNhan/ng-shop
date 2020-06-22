import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent ,
    children: [
      { path: '', component: DashboardComponent},
      { path: 'products', component: ProductsComponent},
      { path: 'customers', component: CustomersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
