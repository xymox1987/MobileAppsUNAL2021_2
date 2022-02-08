import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  events: Event[];
  constructor(private eventService: EventService, public navCtrl: NavController, public alertController: AlertController) {

  }

  async ngOnInit() {
    await this.getAll();
  }

  async getAll() {
    this.events = await this.eventService.getEvents();
  }

  addEvent() {
    this.navCtrl.navigateForward('add-event');

  }


}
