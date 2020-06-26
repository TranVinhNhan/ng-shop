import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { Image } from 'src/app/_models/image';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  product: Product;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.product = data.product);
  }

  loadAlbum(images: Image[]): Image[] {
    return images.filter(i => !i.isThumbnail);
  }
}
