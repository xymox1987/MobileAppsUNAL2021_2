import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  products: Product[];
  constructor(private productService: ProductService) {

  }

  async ngOnInit() {
    this.products = await this.productService.getAllProduct();
  }

}
