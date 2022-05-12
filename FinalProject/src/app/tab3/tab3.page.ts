import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { Farming } from '../models/Farming';
import { FarmingService } from '../../services/farming.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})


export class Tab3Page implements OnInit {

  map: Leaflet.Map;
  farmingList: Farming[];

  constructor(private farmingService: FarmingService) { }
  ngOnInit() {

  }

  async ionViewDidEnter() {
    this.map = new Leaflet.Map('mapId').setView([4.651625, -74.071803], 15);

    Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'edupala.com'
    }).addTo(this.map);

    // aqui la llamada al service
    this.farmingList = await this.farmingService.getAllFarmings();
    this.leafletMap();
  }

  leafletMap() {
    Leaflet.marker([4.651625, -74.071803]).addTo(this.map)
        .bindPopup('Ubicación Inicial')
        .openPopup();
    for (const property of this.farmingList) {
      Leaflet.marker([property.latitude, property.longitude]).addTo(this.map)
        .bindPopup(property.name)
        .openPopup();
    }

    antPath([[4.651625, -74.071803], [4.638493,-74.083965]],
      { color: '#FF0000', weight: 5, opacity: 0.6 })
      .addTo(this.map);
  }

  ionViewWillLeave() {
    this.map.remove();
  }

}
