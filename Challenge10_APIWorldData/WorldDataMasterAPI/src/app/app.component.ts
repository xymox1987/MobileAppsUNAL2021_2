import {
	Component,
	ViewEncapsulation,
	OnInit,
	EventEmitter,
	Output,
} from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";

// Services
import { LanguageService } from "./services/language.service";
import { ThemeService } from "./services/theme.service";
import { StorageService } from "./services/storage.service";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
	@Output() sidenavClose = new EventEmitter();
	darkMode: boolean;
	public language: string = this.languageService.selected;
	public appPages = [
		{
			title: "Countries",			
			url: "/app/tabs/country-list",
			icon: "earth-outline",
			menuIcon: "menuIconCountry",
		},		
	];

	constructor(
		private platform: Platform,
		private router: Router,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		public themeService: ThemeService,
		private languageService: LanguageService,
		private storageService: StorageService
	) {
		this.initializeApp();
	}

	initializeApp() {
		
	}	

	onSidenavClose = () => {
		this.sidenavClose.emit();
	}
}
