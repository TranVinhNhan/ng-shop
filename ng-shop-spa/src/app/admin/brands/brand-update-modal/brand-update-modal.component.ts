import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Brand } from 'src/app/_models/brand';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BrandService } from 'src/app/_services/brand.service';

@Component({
  selector: 'app-brand-update-modal',
  templateUrl: './brand-update-modal.component.html',
  styleUrls: ['./brand-update-modal.component.css']
})
export class BrandUpdateModalComponent implements OnInit {
  title: string;
  brand: Brand;
  updateForm: FormGroup;

  constructor(public bsModalRef: BsModalRef, private brandService: BrandService) { }

  ngOnInit(): void {
    this.initUpdateForm();
  }

  initUpdateForm() {
    this.updateForm = new FormGroup({
      brandName: new FormControl(this.brand.brandName, Validators.required)
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      this.brandService.updateBrand(this.brand.id, this.updateForm.value).subscribe((response: any) => {
        console.log(response);
      }, error => {
        console.log(error);
      }, () => {
        this.brand.brandName = this.updateForm.get('brandName').value;
        this.bsModalRef.hide();
      });
    }
  }
}
