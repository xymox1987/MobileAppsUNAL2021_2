import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { NavController } from '@ionic/angular';
import { Event } from './../../models/Event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  eventModel: Event;
  constructor(private eventService: EventService, public navCtrl: NavController) { }



  ngOnInit() {
    this.eventModel = {
      name: '',
      description: '',
      uriImage: '',
      date: new Date(),
      eventTypeId : 4,
      idcity : 6,
      idUser: 'd6624583-28d6-43dc-8d0e-5389d6270c94'
    } as Event;
  }

  async logForm() {
    try {
      console.log(this.eventModel);
      const response = await this.eventService.createEventAsync(this.eventModel);
      console.log(response);
      this.navCtrl.navigateBack('tabs/tab4');
    } catch (error) {
      console.log(error);
    }
  }
  cancel() {
    this.navCtrl.navigateBack('tabs/tab4');
  }

}
