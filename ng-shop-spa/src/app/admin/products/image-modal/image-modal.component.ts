import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/_models/product';
import { Image } from 'src/app/_models/image';

const URL = environment.apiUrl;

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {
  uploader: FileUploader;
  hasBaseDropZoneOver: false;
  title: string;
  product: Product;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.initUploader();
  }

  initUploader() {
    this.uploader = new FileUploader({
      url: URL + 'product/' + this.product.id + '/images',
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
        this.product.images.push(res);
      }
    };
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
