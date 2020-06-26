import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/_models/product';
import { Image } from 'src/app/_models/image';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-image-delete-modal',
  templateUrl: './image-delete-modal.component.html',
  styleUrls: ['./image-delete-modal.component.css']
})
export class ImageDeleteModalComponent implements OnInit {

  product: Product;
  img: Image;
  title: string;
  constructor(public bsModalRef: BsModalRef, private productService: ProductService) { }

  ngOnInit(): void {
  }

  onDeleteImg() {
    this.productService.deleteImage(this.product.id, this.img.id).subscribe((response: any) => {
      console.log(response);
      this.bsModalRef.hide();
      const index = this.product.images.indexOf(this.img, 0);
      if (index > -1) {
        this.product.images.splice(index, 1);
      }
    }, error => {
      console.log(error);
    });
  }
}
