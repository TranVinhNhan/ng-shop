import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

import { BrandService } from 'src/app/_services/brand.service';
import { Brand } from 'src/app/_models/brand';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BrandImageModalComponent } from './brand-image-modal/brand-image-modal.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BrandUpdateModalComponent } from './brand-update-modal/brand-update-modal.component';
import { ErrorTextService } from 'src/app/_services/error-text.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit, OnDestroy {

  brands: Brand[] = [];
  bsModalRef: BsModalRef;
  isCollapsed = true;
  brandForm: FormGroup;
  isFetchingBrands = false;
  errorMessage: string;
  errorMessageSubscription: Subscription;
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Acer', 'Alienware', 'Apple', 'Asus', 'Dell', 'Hp', 'Lenovo', 'Microsoft', 'msi', 'Razer', 'Thinkpad'];
  public pieChartData: SingleDataSet = [300, 500, 100, 300, 500, 100, 300, 500, 100, 300, 500];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private brandService: BrandService,
    private modalService: BsModalService,
    private errorTextService: ErrorTextService
    ) { }

  ngOnInit(): void {
    this.loadBrands();
    this.initBrandForm();
    this.loadErrorMessage();
  }

  ngOnDestroy(): void {
    this.errorMessageSubscription.unsubscribe();
  }

  initBrandForm() {
    this.brandForm = new FormGroup({
      brandName: new FormControl('', Validators.required)
    });
  }

  loadBrands() {
    this.isFetchingBrands = true;
    this.brandService.getAllBrands().subscribe((brands: Brand[]) => {
      this.brands = brands;
      this.isFetchingBrands = false;
    }, error => {
      console.log(error);
    }, () => {
      this.loadChart();
    });
  }

  loadChart() {
    this.pieChartLabels = this.brands.map(b => b.brandName);
    this.pieChartData = this.brands.map(b => b.products.length);
  }

  loadErrorMessage() {
    this.errorMessageSubscription = this.errorTextService.errorMessage.subscribe((errorMessage: string) => {
      this.errorMessage = errorMessage;
    });
  }

  openModalWithBrandImageModalComponent(brand: Brand, isUpdate: boolean) {
    const initialState = {
      title: 'Thêm logo thương hiệu',
      brand,
      isUpdate
    };
    this.bsModalRef = this.modalService.show(BrandImageModalComponent, { initialState });
    this.bsModalRef.setClass('modal-xl');
  }

  openModalWithBrandUpdateModalComponent(brand) {
    const initialState = {
      title: 'Thay đổi tên thương hiệu',
      brand
    };
    this.bsModalRef = this.modalService.show(BrandUpdateModalComponent, { initialState });
  }

  onSubmit() {
    if (this.brandForm.valid) {
      this.brandService.createBrand(this.brandForm.value).subscribe((response: Brand) => {
        response.products = [];
        this.brands.push(response);
        this.brandForm.reset();
        this.isCollapsed = true;
        this.loadChart();
      }, error => {
        console.log(error);
      });
    }
  }

  onDelete(id: number) {
    if (confirm('Bạn có chắc muốn xóa thương hiệu này chứ? Tất cả các sản phẩm của thương hiệu này cũng sẽ bị xóa')) {
      this.brandService.deleteBrand(id).subscribe((response: any) => {
        console.log(response);
      }, error => {
        console.log(error);
      }, () => {
        const index = this.brands.indexOf(this.brands.find(b => b.id === id), 0);
        if (index > -1) {
          this.brands.splice(index, 1);
          this.loadChart();
        }
      });
    }
  }
}
