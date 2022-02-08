import { City } from './../../models/City';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { NavController } from '@ionic/angular';
import { Event } from './../../models/Event';
import { User } from '../../models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  eventModel: Event;
  cities: City [];
  constructor(private eventService: EventService,
              private userService : UserService,
              public navCtrl: NavController)
                 { }



 async ngOnInit() {
    this.eventModel = {
      name: '',
      description: '',
      uriImage: '',
      date: new Date(),
      eventTypeId : 4,
      idcity : 6,
      idUser: 'd6624583-28d6-43dc-8d0e-5389d6270c94'
    } as Event;
    await this.loadCities();
  }

  async loadCities(){
    this.cities = await this.userService.getCitiesAsync();
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
