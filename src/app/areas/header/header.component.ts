"use strict";

import { Component, OnDestroy } from "@angular/core";

import { RestaurantService } from "../../services/restaurant.service";

import { Subscription } from "rxjs";

@Component({
	selector: "br-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.sass"]
})
export class HeaderComponent implements OnDestroy {
	private readonly subscriber: Subscription;
	private showBackButton = false;

	constructor (private restaurant: RestaurantService) {
		this.subscriber = this
			.restaurant
			.getRestaurantedSelected()
			.subscribe(restaurant => {
				this.showBackButton = !!restaurant;
			});
	}

	back () {
		this.restaurant.setRestaurant(null);
	}

	ngOnDestroy () {
		if (this.subscriber) {
			this.subscriber.unsubscribe();
		}
	}
}
