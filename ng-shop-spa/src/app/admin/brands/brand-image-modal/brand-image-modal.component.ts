import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Brand } from 'src/app/_models/brand';
import { Image } from 'src/app/_models/image';
import { environment } from 'src/environments/environment';
import { BrandService } from 'src/app/_services/brand.service';

const URL = environment.apiUrl;

@Component({
  selector: 'app-brand-image-modal',
  templateUrl: './brand-image-modal.component.html',
  styleUrls: ['./brand-image-modal.component.css']
})
export class BrandImageModalComponent implements OnInit {

  title: string;
  uploader: FileUploader;
  hasBaseDropZoneOver: false;
  brand: Brand;
  isUpdate: boolean;
  constructor(public bsModalRef: BsModalRef, private brandService: BrandService) { }

  ngOnInit(): void {
    this.initUploader();
  }

  initUploader() {
    this.uploader = new FileUploader({
      url: URL + 'brand/' + this.brand.id + '/images',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    // Handle CORS Credentials error
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Image = JSON.parse(response);
        this.brand.image = res;
      }
    };
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  deleteThenUploadImage(item: FileItem) {
    this.brandService.deleteImage(this.brand.id, this.brand.image.id).subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log(error);
    }, () => {
      item.upload();
    });
  }

  deleteThenUploadAll() {
    this.brandService.deleteImage(this.brand.id, this.brand.image.id).subscribe((response: any) => {
      console.log(response);
    }, error => {
      console.log(error);
    }, () => {
      this.uploader.uploadAll();
    });
  }
}
