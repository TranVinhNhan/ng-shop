import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/_models/product';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Brand } from 'src/app/_models/brand';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  product: Product;
  products: Product[];
  brands: Brand[];
  title: string;
  productModalForm: FormGroup;
  constructor(public bsModalRef: BsModalRef, private productService: ProductService) { }

  ngOnInit(): void {
    this.initProductModalForm();
  }

  initProductModalForm() {
    this.productModalForm = new FormGroup({
      productName: new FormControl(this.product.productName, Validators.required),
      productShortName: new FormControl(this.product.productShortName, Validators.required),
      description: new FormControl(this.product.description, Validators.required),
      shortDescription: new FormControl(this.product.shortDescription, Validators.required),
      processor: new FormControl(this.product.processor, Validators.required),
      memory: new FormControl(this.product.memory, Validators.required),
      storage: new FormControl(this.product.storage, Validators.required),
      display: new FormControl(this.product.display, Validators.required),
      graphics: new FormControl(this.product.graphics, Validators.required),
      chargingAndExpansion: new FormControl(this.product.chargingAndExpansion, Validators.required),
      size: new FormControl(this.product.size, Validators.required),
      weight: new FormControl(this.product.weight, Validators.required),
      operatingSystem: new FormControl(this.product.operatingSystem, Validators.required),
      price: new FormControl(this.product.price, Validators.required),
      brandId: new FormControl(this.product.brand.id, Validators.required)
    });
  }

  onSubmit() {
    if (confirm('Bạn có chắc muốn cập nhật sản phẩm này không?')) {
      if (this.productModalForm.valid) {
        this.productService.updateProduct(this.product.id, this.productModalForm.value).subscribe((response: any) => {
          console.log(response);

          const index = this.products.indexOf(this.product, 0);
          if (index > -1) {
            let newProduct: Product;
            newProduct = Object.assign({}, this.productModalForm.value);
            const brand = this.brands.find(x => x.id === +this.productModalForm.get('brandId').value);
            newProduct.brand = brand;
            newProduct.id = this.product.id;
            this.products[index] = newProduct;
          }
          this.bsModalRef.hide();
        }, error => {
          console.log(error);
        });
      }
    } else {
      console.log('cancelled');
    }
  }
}
