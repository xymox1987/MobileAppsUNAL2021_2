import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { TabsPage } from "./tabs.page";
import { TabsPageRoutingModule } from "./tabs.router.module";
import { FavouritesPageModule } from "./../favourites/favourites.module";
import { CountryListPageModule } from "../country-list/country-list.module";

// ngx node modules
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
	imports: [
		CountryListPageModule,
		FavouritesPageModule,		
		CommonModule,
		FormsModule,
		IonicModule,
		TabsPageRoutingModule,
		TranslateModule,
	],
	declarations: [TabsPage],
})
export class TabsPageModule {}
