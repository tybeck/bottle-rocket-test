"use strict";

import { Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core";
import { animate, state, style, transition, trigger } from "@angular/animations";

import { DetailComponent } from "./areas/detail/detail.component";

import { RestaurantService } from "./services/restaurant.service";

import { Subscription } from "rxjs";

@Component({
	selector: "br-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.sass"],
	entryComponents: [DetailComponent],
	animations: [
		trigger("openClose", [
			state("opened", style({
				transform: "translateX(-100%)"
			})),
			state("closed", style({
				transform: "translateX(0)"
			})),
			transition("* => closed", [
				animate("500ms")
			]),
			transition("* => opened", [
				animate("500ms")
			])
		])
	]
})
export class AppComponent implements OnDestroy {
	@ViewChild("detailArea", {read: ViewContainerRef}) detailArea: ViewContainerRef;

	private readonly subscriber: Subscription;

	/**
	 * Tells us whether angular is currently animating
	 * @property isAnimating
	 */
	isAnimating = false;

	/**
	 * Should we be showing the detail area right now or not
	 * @property showDetailArea
	 */
	private showDetailArea = false;

	// tslint:disable-next-line
	constructor (
		public componentFactoryResolver: ComponentFactoryResolver,
		private restaurant: RestaurantService
	) {
		this.subscriber = this
			.restaurant
			.getRestaurantedSelected()
			.subscribe(restaurant => {
				if (this.showDetailArea && !restaurant) {
					this.showDetailArea = false;
				}
			});
	}

	toggleDetails (visibility = true) {
		this.showDetailArea = visibility;
	}

	animationStart = () => this.isAnimating = true;

	animationDone = () => {
		const selectedRestaurant = this.restaurant.getRestaurantedSelected().value;
		this.isAnimating = false;
		if (!selectedRestaurant && this.detailArea.length) {
			this.detailArea.clear();
		}
	}

	ngOnDestroy () {
		if (this.subscriber) {
			this.subscriber.unsubscribe();
		}
	}
}