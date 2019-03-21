"use strict";

import { Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";

import { RestaurantService } from "../../services/restaurant.service";

import { Restaurant } from "../../models/models.interface";

import { Subscription } from "rxjs";
import { animate, state, style, transition, trigger } from "@angular/animations";

declare const google: any;

@Component({
	selector: "br-item-detail",
	templateUrl: "./detail.component.html",
	styleUrls: ["./detail.component.sass"],
	animations: [
		trigger("openClose", [
			state("opened", style({
				transform: "translateX(0)"
			})),
			state("closed", style({
				transform: "translateX(100%)"
			})),
			transition("* => opened", [
				animate("500ms")
			]),
			transition("* => closed", [
				animate("500ms")
			])
		])
	]
})
export class DetailComponent implements OnDestroy {
	@ViewChild("map") map: ElementRef;

	private readonly subscriber: Subscription;

	/**
	 * The selected restaurants details
	 * @property selectedRestaurant
	 */
	private selectedRestaurant: Restaurant|null;

	/**
	 * Whether or not the detailed area is shown or not
	 * @property showDetailedArea
	 */
	private showDetailedArea = false;

	/**
	 * Google Map Instance
	 * @property googleMap
	 */
	private googleMap = null;

	/**
	 * The marker point on the map
	 * @property googleMarker
	 */
	private googleMarker = null;

	constructor (private restaurant: RestaurantService) {
		this.subscriber = this
			.restaurant
			.getRestaurantedSelected()
			.subscribe(restaurant => {
				if (restaurant) {
					const {lat, lng} = restaurant.location;
					this.selectedRestaurant = restaurant;
					this.googleMap = new google.maps.Map(this.map.nativeElement, {
						center: {lat, lng},
						zoom: 16
					});
					this.googleMarker = new google.maps.Marker({position: {lat, lng}, map: this.googleMap});
					this.showDetailedArea = true;
				} else {
					this.showDetailedArea = false;
				}
			});
	}

	ngOnDestroy () {
		this.googleMarker = null;
		this.googleMap = null;
		if (this.subscriber) {
			this.subscriber.unsubscribe();
		}
	}
}
