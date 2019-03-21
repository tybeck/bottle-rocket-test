"use strict";

import { Component, forwardRef, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { BehaviorSubject } from "rxjs";

import { DetailComponent } from "../detail/detail.component";
import { AppComponent } from "../../app.component";

import { RestaurantService } from "../../services/restaurant.service";

import { Restaurant, RestaurantResponse } from "../../models/models.interface";

@Component({
	selector: "br-list",
	templateUrl: "./list.component.html",
	styleUrls: ["./list.component.sass"]
})
export class ListComponent {
	/**
	 * List of restaurants
	 * @property restaurants
	 */
	private restaurants: Restaurant[] = [];

	constructor (
		@Inject(forwardRef(() => AppComponent)) private app: AppComponent,
		private route: ActivatedRoute,
		private restaurant: RestaurantService
	) {
		const resolves: RestaurantResponse = (this.route.data as BehaviorSubject<RestaurantResponse>).value;
		if (resolves && resolves.restaurants) {
			this.restaurants = resolves.restaurants;
		}
	}

	/**
	 * @method openDetail
	 * @param restaurant
	 */
	openDetail (restaurant: Restaurant) {
		const {detailArea} = this.app;
		if (!this.app.isAnimating) {
			const factory = this.app.componentFactoryResolver.resolveComponentFactory(DetailComponent);
			if (factory) {
				detailArea.createComponent(factory);
				if (detailArea.length) {
					this.restaurant.setRestaurant(restaurant);
					this.app.toggleDetails(true);
				}
			}
		}
	}
}
