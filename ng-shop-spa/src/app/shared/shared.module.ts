import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacedTimePipe } from '../_pipes/order-table.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PlacedTimePipe
  ],
  exports: [
    PlacedTimePipe,
    CommonModule, FormsModule
  ]
})
export class SharedModule { }
