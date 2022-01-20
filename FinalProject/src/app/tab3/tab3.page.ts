import { Component, ElementRef, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})


export class Tab3Page {
  @ViewChild('map') mapView: ElementRef;

  constructor() {}
   ionViewDidEnter() {
     this.createMap();
   }

   createMap() {
     const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;

     CapacitorGoogleMaps.create({
       width: Math.round(boundingRect.width),
       height: Math.round(boundingRect.height),
       x: Math.round(boundingRect.x),
       y: Math.round(boundingRect.y),
       zoom: 5
     });

     CapacitorGoogleMaps.addListener('onMapReady', async () => {
       CapacitorGoogleMaps.setMapType({
         type: 'normal' // hybrid, satellite, terrain
       });

       this.showCurrentPosition();
     });
   }

   async showCurrentPosition() {
     // todo
   }

   ionViewDidLeave() {
     CapacitorGoogleMaps.close();
   }

}
