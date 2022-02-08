import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProductService } from 'src/services/product.service';
import { Product } from '../models/Product';
import { AlertController } from '@ionic/angular';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  products: Product[];
  constructor(private productService: ProductService, public navCtrl: NavController, public alertController: AlertController) {

  }

  async ngOnInit() {
    await this.getAll();
  }


  async getAll() {
    this.products = await this.productService.getAllProduct();
  }
  addProduct() {
    this.navCtrl.navigateForward('add-product');

  }

  async deleteConfirm(id: number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: ' Are you sure you want to <strong>delete the product?</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          // id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          // id: 'confirm-button',
          handler: async () => {
            await this.productService.deleteProductAsync(id);
            console.log('Confirm Okay');
            await this.getAll();
          }
        }
      ]
    });

    await alert.present();
  }
}
