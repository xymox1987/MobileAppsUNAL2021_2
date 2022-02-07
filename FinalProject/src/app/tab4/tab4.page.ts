import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  events: Event[];
  constructor(private eventService: EventService) {

  }

  async ngOnInit() {
    this.events = await this.eventService.getEvents();
  }

}
