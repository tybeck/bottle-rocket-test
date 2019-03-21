"use strict";

import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { loadScript } from "./app/utils/load-script.util";
import {watch} from "./app/app.font-awesome";

watch();

loadScript(`https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`)
	.then(() => console.log("Google Maps API - Loaded"))
	.catch(err => console.log("Google Maps API - Error!", err));

if (environment.production) {
	enableProdMode();
}

document.addEventListener("DOMContentLoaded", () => {
	platformBrowserDynamic()
		.bootstrapModule(AppModule)
		.catch(err => console.log(err));
});
