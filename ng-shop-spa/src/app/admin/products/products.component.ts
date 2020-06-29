import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Product } from 'src/app/_models/product';
import { Brand } from 'src/app/_models/brand';
import { Image } from 'src/app/_models/image';
import { ProductService } from 'src/app/_services/product.service';
import { BrandService } from 'src/app/_services/brand.service';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { ImageDeleteModalComponent } from './image-delete-modal/image-delete-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  isCollapsed = true;
  products: Product[] = [];
  brands: Brand[] = [];
  productForm: FormGroup;
  bsModalRef: BsModalRef;

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadBrands();
    this.initProductForm();
  }

  initProductForm() {
    this.productForm = new FormGroup({
      productName: new FormControl(null, Validators.required),
      productShortName: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      shortDescription: new FormControl(null, Validators.required),
      processor: new FormControl(null, Validators.required),
      memory: new FormControl(null, Validators.required),
      storage: new FormControl(null, Validators.required),
      display: new FormControl(null, Validators.required),
      graphics: new FormControl(null, Validators.required),
      chargingAndExpansion: new FormControl(null, Validators.required),
      size: new FormControl(null, Validators.required),
      weight: new FormControl(null, Validators.required),
      operatingSystem: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      brandId: new FormControl(1, Validators.required)
    });
  }

  isImageNull(product: Product): boolean {
    if (product.images) {
      if (product.images.length > 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products;
    }, error => {
      console.log(error);
    });
  }

  loadBrands() {
    this.brandService.getAllBrands().subscribe((brands: Brand[]) => {
      this.brands = brands;
    }, error => {
      console.log(error);
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe((response: any) => {
        console.log(response);
        this.loadProducts();
        this.productForm.reset();
        this.isCollapsed = true;
      }, error => {
        console.log(error);
      });
    }
  }

  onDelete(id: number) {
    if (confirm('Bạn chắc chắn muốn xóa sản phẩm này chứ?')) {
      this.productService.deleteProduct(id).subscribe((response: any) => {
        console.log(response);
        this.loadProducts();
      }, error => {
        console.log(error);
      });
    } else {
      console.log('cancelled');
    }
  }

  openModalWithProductModalComponent(product: Product) {
    const initialState = {
      product,
      products: this.products,
      brands: this.brands,
      title: 'Cập nhật sản phẩm'
    };
    this.bsModalRef = this.modalService.show(ProductModalComponent, { initialState });
    this.bsModalRef.setClass('modal-lg');
  }

  openModalWithImageModalComponent(product: Product) {
    const initialState = {
      title: 'Thêm hình ảnh',
      product
    };
    this.bsModalRef = this.modalService.show(ImageModalComponent, { initialState });
    this.bsModalRef.setClass('modal-xl');
  }

  openModalWithImageDeleteModalComponent(product: Product, img: Image) {
    const initialState = {
      product,
      img,
      title: 'Hình ảnh sản phẩm'
    };
    this.bsModalRef = this.modalService.show(ImageDeleteModalComponent, { initialState });
    this.bsModalRef.setClass('modal-lg');
  }
}
