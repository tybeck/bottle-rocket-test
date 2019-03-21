"use strict";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ServiceWorkerModule } from "@angular/service-worker";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { environment } from "../environments/environment";

/** components **/
import { AppComponent } from "./app.component";
import { Components } from "./areas";

/** services **/
import { RestaurantService } from "./services/restaurant.service";

/** modules **/
import { AppRoutingModule } from "./app-routing.module";

/** resolves **/
import { ListRestaurantsResolve } from "./services/resolves/list-restaurants.resolve";

/** providers **/

import { WINDOW_PROVIDERS } from "./services/window.service";

@NgModule({
	declarations: [AppComponent, ...Components],
	imports: [
		BrowserModule.withServerTransition({ appId: "serverApp" }),
		BrowserAnimationsModule,
		AppRoutingModule,
		ServiceWorkerModule.register("/ngsw-worker.js", { enabled: environment.production }),
		HttpClientModule
	],
	providers: [
		WINDOW_PROVIDERS,
		RestaurantService,
		ListRestaurantsResolve
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
