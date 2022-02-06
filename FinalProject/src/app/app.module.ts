import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from '../services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from 'src/services/product.service';
import { EventService } from '../services/event.service';
import { FarmingService } from '../services/farming.service';
import { FriendService } from '../services/Friend.service';
import { AuthorizeInterceptor } from './AuthorizeInterceptor';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),HttpClientModule,
    AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    UserService,
    ProductService,
    EventService,
    FarmingService,
    FriendService


  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
