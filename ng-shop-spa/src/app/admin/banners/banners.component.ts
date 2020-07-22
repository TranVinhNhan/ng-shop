import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { Image } from 'src/app/_models/image';
import { BannerService } from 'src/app/_services/banner.service';
import { AlertifyService } from 'src/app/_services/alertifyjs.service';

const URL = environment.apiUrl;

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  banners: Image[] = [];
  isCollapsed = true;
  uploader: FileUploader;
  constructor(
    private bannerService: BannerService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit(): void {
    this.initUploader();
    this.loadBanners();
  }

  loadBanners() {
    this.bannerService.getAllBanners().subscribe((response: Image[]) => {
      this.banners = response;
    }, error => console.log(error));
  }

  initUploader() {
    this.uploader = new FileUploader({
      url: URL + 'banner',
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
        this.banners.push(res);
      }
    };
  }

  onDeleteBanner(id: number) {
    this.alertifyService.confirm('Bạn có chắc muốn xóa ảnh này chứ?', () => {
      this.bannerService.deleteBanner(id).subscribe(
      () => {},
        error => console.log(error),
      () => {
        const index = this.banners.findIndex(banner => banner.id === id);
        if (index > -1) {
          this.banners.splice(index, 1);
        }
      });
    });
  }
}
