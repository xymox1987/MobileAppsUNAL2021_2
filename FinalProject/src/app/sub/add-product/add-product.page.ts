import { Product } from './../../models/Product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  productModel: Product;
  constructor(private productService: ProductService, public navCtrl: NavController) { }

  ngOnInit() {
    this.productModel = {
      name: '',
      description: '',
      idUser: 'd6624583-28d6-43dc-8d0e-5389d6270c94'
    } as Product;
  }

  async logForm() {
    try {
      console.log(this.productModel);
      const response = await this.productService.createProductAsync(this.productModel);
      console.log(response);
      this.navCtrl.navigateBack('tabs/tab2');
    } catch (error) {
      console.log(error);
    }
  }
  cancel() {
    this.navCtrl.navigateBack('tabs/tab2');
  }
}
