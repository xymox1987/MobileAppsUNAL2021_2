import { Component } from '@angular/core';
import L from "leaflet";
import 'leaflet-routing-machine';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: L.Map;
  center: L.PointTuple;
  // startCoords = [28.644800, 77.216721];
  startCoords = [4.651625, -74.071803]; 

  constructor(public platform: Platform) 
  {
    this.center = this.startCoords;
    this.platform.ready().then(() =>
    {
      this.leafletMap();
    })
  }

  leafletMap()
  {
    this.map = L.map('mapId', 
    {
      center: this.center,
      zoom: 20
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '', 
    }).addTo(this.map);

    L.Routing.control({
      waypoints: [
          // L.latLng(51.5, -0.09), 
          L.latLng(4.651625, -74.071803),
          L.latLng(4.638493,-74.083965)
          
          
      ]
    }).addTo(this.map);;
  }

}
