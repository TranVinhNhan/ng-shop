import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';

import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/_models/product';
import { Image } from 'src/app/_models/image';
import { BrandService } from 'src/app/_services/brand.service';
import { Brand } from 'src/app/_models/brand';
import { BannerService } from 'src/app/_services/banner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productsArray: Product[] = [];
  onePageArray: Product[] = [];
  showBrands: Brand[] = [];
  banners: Image[] = [];
  isFetchingProduct = false;
  isFetchingBanner = false;
  isFetchingLogo = false;
  filterString: string;
  searchString: string;
  brandNameArray = [];

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private bannerService: BannerService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadBrands();
    this.loadBanners();
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.onePageArray = this.productsArray.slice(startItem, endItem);
  }

  loadProducts() {
    this.isFetchingProduct = true;
    this.productService
      .getAllProducts()
      .subscribe((products: Product[]) => {
        this.productsArray = products.filter(item => item.isDisplayed);
        this.onePageArray = this.productsArray.slice(0, 10);
        this.isFetchingProduct = false;
      }, error => {
        console.log(error);
      });
  }

  loadBrands() {
    this.isFetchingLogo = true;
    this.brandService.getAllBrands().subscribe((response: Brand[]) => {
      const brands: Brand[] = [];
      response.forEach(brand => {
        if (brand.image) {
          brands.push(brand);
        }
      });
      this.showBrands = brands.slice(0, 11);
      this.brandNameArray = this.showBrands.map(brand => brand.brandName);
      this.isFetchingLogo = false;
    }, error => {
      console.log(error);
    });
  }

  loadBanners() {
    this.isFetchingBanner = true;
    this.bannerService.getAllBanners().subscribe((response: Image[]) => {
      this.banners = response;
      this.isFetchingBanner = false;
    }, error => console.log(error));
  }

  haveThumbnail(images: Image[]): boolean {
    return (images.filter(img => img.isThumbnail === true).length > 0) ? true : false;
  }

  loadThumbnail(images: Image[]) {
    return (images.filter(img => img.isThumbnail === true)[0].url);
  }

  setFilter(s: string) {
    this.filterString = s;
  }
}
